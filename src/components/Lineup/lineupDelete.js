import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

class Lineup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lineup: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/lineups/${this.props.match.params.id}`)
      .then(res => this.setState({ lineup: res.data.lineup }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/lineups/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { lineup, deleted } = this.state

    if (!lineup) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { state: { msg: 'Lineup succesfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <h4>{lineup.lineupName}</h4>
        <button onClick={this.destroy}>Delete Lineup</button>
        <Link to="/lineups">Back to all lineups</Link>
      </Layout>
    )
  }
}

export default Lineup
