import React, { useState, useEffect } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Lineup = props => {
  const [lineup, setLineup] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const getLineup = () => {
    return axios({
      url: `${apiUrl}/lineups/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
  }

  useEffect(() => {
    getLineup()
      .then(res => setLineup(res.data.lineup))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/lineups/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!lineup) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={{ pathname: '/', state: { msg: 'Lineup succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{Lineup.lineupName}</h4>
      <button onClick={destroy}>Delete Lineup</button>
      <Link to={`/lineups/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/lineups'>Back to all lineups</Link>
    </Layout>
  )
}

export default withRouter(Lineup)
