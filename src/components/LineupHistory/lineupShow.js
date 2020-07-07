import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

// import axios and apiUrl
import axios from 'axios'
import apiUrl from './apiConfig'

import Layout from './shared/Layout'

class LineupShow extends Component {
  constructor () {
    super()

    this.state = {
      lineup: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/lineups/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
        this.setState({ lineup: res.data.lineup })
      })
      .catch(console.error)
  }

  deleteLineup = () => {
    // axios.delete(`${apiUrl}/books/${this.props.match.params.id}`)
    axios({
      method: 'DELETE',
      url: `${apiUrl}/lineups/${this.props.match.params.id}`
    })
      .then(res => {
        // change state to reflect that the book was deleted
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const { lineup, deleted } = this.state

    let lineupJsx

    if (!lineup) {
      lineupJsx = 'Loading...'
    } else if (deleted) {
      // this.props.history.push('/books')
      lineupJsx = <Redirect to="/books"/>
    } else {
      lineupJsx = (
        <div>
          <h3>{lineup.name}</h3>
          <button onClick={this.deleteLineup}>Delete Book</button>
          <Link to={`/lineups/${this.props.match.params.id}/edit`}><button>Update Lineup</button></Link>
        </div>
      )
    }

    return (
      <Layout>
        <h2>Single Lineup Page</h2>
        {lineupJsx}
      </Layout>
    )
  }
}

export default LineupShow
