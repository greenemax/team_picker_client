import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { getHistory } from '../../api/lineup'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import { deepIndexOf } from '../../lib/deep-index-of'

const LineupHistory = ({ user, msgAlert }) => {
  const [lineupHistory, setLineupHistory] = useState([])

  useEffect(() => {
    getHistory(user)
      .then(data => {
        const lineup = data.data.lineup
        const inactiveLineups = lineup.filter(lineup => !lineup.active)
        const inactiveWithQuantity = inactiveLineups.map(activeLineup => {
          const currLineup = {
            player: [],
            quantities: [],
            totalCost: 0,
            _id: activeLineup._id
          }
          currLineup.totalCost = activeLineup.totalCost
          for (let i = 0; i < activeLineup.players.length; i++) {
            const currPlayer = activeLineup.players[i]
            if (deepIndexOf(currLineup.players, currPlayer) === -1) {
              currLineup.products.push(currLineup)
              const index = deepIndexOf(currLineup.players, currPlayer)
              currLineup.quantities[index] = 1
            } else {
              const index = deepIndexOf(currLineup.players, currPlayer)
              currLineup.quantities[index] += 1
            }
          }
          return currLineup
        })
        setLineupHistory(inactiveWithQuantity)
      })
      .catch(() => {
        msgAlert({
          heading: 'Lineup History Failed',
          message: messages.getLineupHistory,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <div>
      <h2>Lineup History:</h2>
      {lineupHistory && lineupHistory.map(lineup => (
        <div key={lineup._id}>
          <h3>Lineup:</h3>
          {lineup.players.map((players, index) => (
            <div key={players._id}>
              <Card>
                <Card.Body>
                  <Card.Title><h3>{players.name}</h3></Card.Title>
                  <Card.Text><h5>{players.description}</h5></Card.Text>
                  <Card.Text className="lineupCost"> <p>{lineup.quantities[index]} &emsp; for &emsp; ${players.cost}</p></Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
          <h4>Total:${lineup.totalCost}</h4>
        </div>
      ))}
    </div>
  )
}

export default withRouter(LineupHistory)
