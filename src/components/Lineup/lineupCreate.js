import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
import LineupForm from '../shared/lineupForm.js'
import Layout from '../shared/Layout'
class LineupCreate extends Component {
  constructor () {
    super()

    this.state = {
      lineup: {
        name: ''
      },
      updated: false
    }
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(currentState => {
      return { lineup: { ...currentState.lineup, ...updatedField } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: apiUrl + '/lineup-create',
      method: 'POST',
      data: {
        'lineup': {
          'lineupName': this.state.lineup.name
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

export default LineupCreate
