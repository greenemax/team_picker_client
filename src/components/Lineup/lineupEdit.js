import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
import LineupForm from '../shared/lineupForm.js'
import Layout from '../shared/Layout'
class LineupEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lineup: {
        name: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/lineups-edit/`)
      .then(res => this.setState({ lineup: res.data.lineup }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedLineup = Object.assign(this.state.lineup, updatedField)

    this.setState({ lineup: editedLineup })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: apiUrl + '/lineup-edit',
      method: 'PATCH',
      data: {
        'lineup': {
          'lineupName': this.state.lineup.lineupName,
          'active': true,
          'totalCost': 0
        }
      },
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
  }

  render () {
    const { lineup, updated } = this.state

    if (updated) {
      return <Redirect to={`/lineups/${this.props.match.params.id}`}/>
    }

    return (
      <Layout>
        <h2>Lineup Creation Page</h2>
        <LineupForm
          lineup={lineup}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default LineupEdit
