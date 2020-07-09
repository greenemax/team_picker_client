import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import Layout from '../shared/Layout'

class LineupIndex extends Component {
  constructor (props) {
    // call the constructor of the Component class
    super(props)

    // useful constructors have state!
    this.state = {
      lineups: null
    }
  }

  componentDidMount () {
    // This will run AFTER the FIRST render() runs
    // API Requests happen here
    axios(`${apiUrl}/lineups`)
      .then(res => {
        this.setState({ lineups: res.data.lineups })
      })
      .catch(console.error)
  }

  render () {
    const lineups = this.state.lineups.map(lineup => (
      <li key={lineup.id}>
        <Link to={`/lineups/${lineup._id}`}>{lineup.title}</Link>
      </li>
    ))

    return (
      <Layout>
        <h4>Lineups</h4>
        <ul>
          {lineups}
        </ul>
      </Layout>
    )
  }
}

export default LineupIndex
