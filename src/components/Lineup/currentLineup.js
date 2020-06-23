import React, { useState, useEffect } from 'react'
import { removeFromLineup } from '../../api/players'
import { getHistory } from '../../api/lineup'
import { withRouter, Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { deepIndexOf } from '../../lib/deep-index-of'
// import CardGroup from 'react-bootstrap/CardGroup'

const CurrentLineup = ({ user, msgAlert, match }) => {
  const [lineup, setLineup] = useState({
    players: [],
    quantities: [],
    totalCost: 0
  })
  const [rerender, setRerender] = useState(false)

  // const deepIndexOf = (arr, val) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (lodash.isEqual(arr[i], val)) {
  //       return i
  //     }
  //   }
  //   return -1
  // }

  useEffect(() => {
    getHistory(user)
      .then(data => {
        const lineups = data.data.lineup
        const activeLineup = lineups.find(lineup => lineup.active)
        const currLineup = {
          players: [],
          quantities: [],
          totalCost: 0
        }
        currLineup.totalCost = activeLineup.totalCost
        for (let i = 0; i < activeLineup.players.length; i++) {
          const currPlayer = activeLineup.player[i]
          if (deepIndexOf(currLineup.players, currPlayer) === -1) {
            currLineup.players.push(currPlayer)
            const index = deepIndexOf(currLineup.players, currPlayer)
            currLineup.quantities[index] = 1
          } else {
            const index = deepIndexOf(currLineup.players, currPlayer)
            currLineup.quantities[index] += 1
          }
        }
        setLineup(currLineup)
      })
      .catch(() => {
        msgAlert({
          heading: 'Lineup Failed',
          message: messages.getLineupFailure,
          variant: 'danger'
        })
      })
  }, [rerender])

  const onRemoveFromLineup = (event, player) => {
  // get all lineups belonging to current user
    getHistory(user)
      .then(data => {
        const lineups = data.data.lineup
        const activeLineup = lineups.find(lineup => lineup.active)
        removeFromLineup(activeLineup._id, player, user)
      })
      .then(() => setRerender(!rerender))
      .catch(() => {
        msgAlert({
          heading: 'Lineup Failed',
          message: messages.removeLineupFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <h2 className="title">Your Starting Lineup</h2>
      {lineup.players.map((player, index) => (
        <div key={player._id}>
          <Card className="container">
            <Card.Body className="lineupCost row" >
              <Card.Img className="col-4" src={player.imageURL} />
              <div className="col-8">
                <Card.Title><h5>{player.name}</h5></Card.Title>
                <Card.Text className="lineupCost"> <p>{lineup.quantities[index]} &emsp; for &emsp; ${player.cost}</p></Card.Text>
                <h5 className="removeLink" onClick={() => onRemoveFromLineup(event, player)}>remove</h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div className="moveRight">
        <h3> Total:${lineup.totalCost}</h3>
        <Link to={'/checkout'}><Button className="moveRight" variant="primary">Squad Up!</Button></Link>
      </div>
    </div>
  )
}

export default withRouter(CurrentLineup)
