import React, { useState, useEffect, Component } from 'react'
import { getHistory, deleteLineup, updateLineup } from '../../api/lineup'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import LineupForm from '../shared/lineupForm.js'
import Layout from '../shared/layout.js'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import { deepIndexOf } from '../../lib/deep-index-of'
// import CardGroup from 'react-bootstrap/CardGroup'

const CurrentLineup = ({ user, msgAlert, match }) => {
  const [lineup, setLineup] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [updated, setUpdated] = useState(false)
  // const [rerender] = useState(false)
  useEffect(() => {
    getHistory(user)
      .then(data => {
        // const lineups = data.data.lineup
        setLineup(data.data.lineup)
      })
      .catch(() => {
        msgAlert({
          heading: 'Lineup Not Found',
          message: messages.getLineupFailure,
          variant: 'danger'
        })
      })
  }, [])

  const onDeleteLineup = (lineupUser, lineupId) => {
    deleteLineup(lineupUser, lineupId)
      .then(() => setDeleted(true))
      .catch(() => {
        msgAlert({
          heading: 'Lineup Not Deleted',
          message: messages.getLineupFailure,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/lineups-create' }
    } />
  }

  const onEditLineup = (lineupUser, lineupId) => {
    updateLineup(lineupUser, lineupId)
      .then(() => setUpdated(true))
      .catch(() => {
        msgAlert({
          heading: 'Lineup Not Deleted',
          message: messages.getLineupFailure,
          variant: 'danger'
        })
      })
  }

  componentDidMount () {
    axios(`${apiUrl}/lineups/${this.props.match.params.id}`)
      .then(res => this.setState({ lineup: res.data.lineup }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedLineup = Object.assign(this.state.lineup, updatedField)

    this.setState({ lineup: editedLineup })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/lineups/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { lineup: this.state.lineup }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { lineup, updated } = this.state
    const { handleChange, handleSubmit } = this

  if (updated) {
    return <Redirect to={
      { pathname: '/lineups-create' }
    } />
  }

  return (
    <div>
      <h2 className="title">Your Lineup</h2>
      {lineup.map((line) => (
        <div key={line._id}>
          <Card className="container">
            <Card.Body className="lineupCost row" >
              <div className="col-8">
                <h5>{line.lineupName}</h5>
                <h5 className="removeLink" onClick={() => onDeleteLineup(user, line._id)}>remove</h5>
                <Layout>
                  <LineupForm
                    lineup={lineup}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelPath={`/lineups/${this.props.match.params.id}`}
                  />
                </Layout>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div className="moveRight">
      </div>
    </div>
  )
}

export default withRouter(CurrentLineup)
