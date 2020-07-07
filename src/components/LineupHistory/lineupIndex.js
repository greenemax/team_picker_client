import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './apiConfig.js'

import Layout from './shared/Layout'

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
    const { lineups } = this.state

    let lineupJsx

    if (!lineups) {
      // books are null, we are still loading the books in
      lineupJsx = 'Loading...'
    } else if (!lineups.length) {
      // the length of the books array is 0
      // we have no books to display
      lineupJsx = 'No books to display, go make some!'
    } else {
      // we got our books! display them:
      lineupJsx = (
        <ul>
          {lineups.map(lineup => (
            <li key={lineup._id}>
              <Link to={`/books/${lineup._id}`}>{lineup.title}</Link>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <Layout>
        <h2>Lineup Page</h2>
        {lineupJsx}
      </Layout>
    )
  }
}

export default LineupIndex
