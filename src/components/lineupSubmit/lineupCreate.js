import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import LineupForm from '../lineupSubmit/lineupForm'
import Layout from '../shared/Layout'

const LineupCreate = (props) => {
  const [lineup, setLineup] = useState({
    name: ''
  })
  const [createdLineupId, setCreatedLineupId] = useState(null)

  const handleChange = event => {
    event.persist()

    setLineup(prevLineup => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedLineup = Object.assign({}, prevLineup, updatedField)
      setLineup(editedLineup)
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/lineups/`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { lineup }
    })
      .then(res =>
        setCreatedLineupId(res.data.lineup._id))
      .catch(console.error)
  }

  if (createdLineupId) {
    return <Redirect to={`/lineups/${createdLineupId}`} />
  }

  return (
    <Layout>
      <LineupForm
        lineup={lineup}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default LineupCreate
