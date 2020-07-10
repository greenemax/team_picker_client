import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import LineupForm from '../lineupSubmit/lineupForm'
import Layout from '../shared/Layout'

const LineupEdit = (props) => {
  const [lineup, setLineup] = useState({ name: '' })
  const [updated, setUpdated] = useState(false)

  const updateLineup = () => {
    return axios({
      url: `${apiUrl}/lineups/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
  }
  useEffect(() => {
    updateLineup()
      .then(res => setLineup(res.data.lineup))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedLineup = Object.assign({}, lineup, updatedField)

    setLineup(editedLineup)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/lineups/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { lineup }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to='/' />
  }

  return (
    <Layout>
      <LineupForm
        lineup={lineup}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/lineups/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default withRouter(LineupEdit)
