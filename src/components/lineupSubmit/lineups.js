import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Lineups = props => {
  const [lineups, setLineups] = useState([])
  const getLineups = () => {
    return axios({
      url: `${apiUrl}/lineups/`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
  }
  useEffect(() => {
    console.log('hi')
    getLineups()
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setLineups(res.data.lineup))
      .then(() => {
        console.log(lineups)
      })
      .catch(console.error)
  }, [])

  const lineupsJsx = lineups.map(lineup => (
    <li key={lineup.id}>
      <Link to={`/lineups/${lineup._id}`} user={props.user}>{lineup.name}</Link>
    </li>
  ))

  return (
    <Layout>
      <h4>Lineups</h4>
      <ul>
        {lineupsJsx}
      </ul>
    </Layout>
  )
}

export default withRouter(Lineups)
