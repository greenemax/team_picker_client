import React, { useState, useEffect } from 'react'
import { getPlayers, addToLineup } from '../../api/players'
import { getHistory } from '../../api/lineup'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Form from 'react-bootstrap/Form'
const PlayersPage = ({ user, msgAlert, setSearch }) => {
  const [players, setPlayers] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [localSearch, setLocalSearch] = useState('')

  useEffect(() => {
    getPlayers()
      .then(currPlayer => {
        setPlayers(currPlayer.data.players)
      })
      .catch(() => {
        msgAlert({
          heading: 'Player Search Failed',
          message: messages.getPlayerFailure,
          variant: 'danger'
        })
      })
  }, [isSearch])

  const onAddToLineup = (event, player) => {
    // get all lineups belonging to current user
    getHistory(user)
      .then(data => {
        const lineup = data.data.lineup
        // find the current active lineup
        const activeLineup = lineup.find(lineup => lineup.active)
        addToLineup(activeLineup._id, player, user)
      })
      .catch(() => {
        msgAlert({
          heading: 'Add To Lineup Failed',
          message: messages.addToLineupFailure,
          variant: 'danger'
        })
      })
  }

  // const convertDollar = (num) => {
  //   const total = num * 0.01
  //   return total.toFixed(2)
  // }

  const handleChange = event => {
    setLocalSearch(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    setSearch(localSearch)
    setIsSearch(true)
  }

  if (!isSearch) {
    return (
      <div>
        <h2>NBA Players</h2>
        <Form inline onSubmit={onSubmit}>
          <Form.Control type="text" placeholder="Search" onChange={handleChange} value={localSearch} />
          <Button className='search-btn' type="submit" variant="outline-info">Search</Button>
        </Form>
        <CardGroup>
          {players.map(player => (
            <div key={player._id}>
              <Card style={{ width: '12rem' }} >
                <Card.Body>
                  <Card.Title><h3>{player.name}</h3></Card.Title>
                  <h4> ${player.cost} </h4>
                  <h6>Position: {player.category}</h6>
                  {user && <Button onClick={() => onAddToLineup(event, player)}>Add To Lineup</Button>}
                </Card.Body>
              </Card>
            </div>
          ))}
        </CardGroup>
      </div>
    )
  } else {
    return (
      <Redirect to="/search-player"/>
    )
  }
}

export default withRouter(PlayersPage)
