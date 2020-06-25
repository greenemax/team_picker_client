import React, { useState, useEffect } from 'react'
import { getPlayers, addToLineup } from '../../api/players'
import { getHistory } from '../../api/lineup'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Form from 'react-bootstrap/Form'

const SearchPlayers = ({ search, user, msgAlert, setSearch }) => {
  const [players, setPlayers] = useState([])
  const [localSearch, setLocalSearch] = useState('')
  const [reloadResults, setReloadResults] = useState(false)

  useEffect(() => {
    getPlayers()
      .then(data => {
        const players = data.data.players
        const searchQuery = search.toUpperCase()
        const queries = searchQuery.split(' ')
        const result = []
        for (let i = 0; i < players.length; i++) {
          const currPlayer = players[i]
          const nameTracker = []
          // create an array of the words in the title of the current player
          const nameWords = currPlayer.name.split(' ')
          // loop through title words
          for (let z = 0; z < nameWords.length; z++) {
            const currNameWord = nameWords[z].toUpperCase()
            // if the title word matches one of the queries, mark it in the titleTracker
            for (let q = 0; q < queries.length; q++) {
              const currQuery = queries[q]
              if (currNameWord.includes(currQuery)) {
                nameTracker[q] = true
              }
            }
          }
          // check titleTracker to see if it has the same length as queries
          if (nameTracker.length === queries.length) {
            // check that no indices are empty
            if (!(nameTracker.includes(undefined))) {
              // this recipe qualifies, add it
              result.push(currPlayer)
            }
          }
        }
        setPlayers(result)
      })
      .catch(() => {
        msgAlert({
          heading: 'Player Search Failed',
          message: messages.getPlayerFailure,
          variant: 'danger'
        })
      })
  }, [reloadResults])

  const onAddToLineup = (event, player) => {
    // get all lineups belonging to current user
    getHistory(user)
      .then(data => {
        const lineups = data.data.lineup
        // find the current active lineup
        const activeLineup = lineups.find(lineup => lineup.active)
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

  const convertDollar = (num) => {
    const total = num * 0.01
    return total.toFixed(2)
  }

  const handleChange = event => {
    setLocalSearch(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    setSearch(localSearch)
    setReloadResults(!reloadResults)
  }

  if (players.length > 0) {
    return (
      <div>
        <h2>Search Results</h2>
        <Form inline onSubmit={onSubmit}>
          <Form.Control type="text" placeholder="Search" onChange={handleChange} value={localSearch} />
          <Button className='search-btn' type="submit" variant="outline-info">Search</Button>
        </Form>
        <CardGroup>
          {players.map(player => (
            <div key={player._id}>
              <Card style={{ width: '18rem' }} >
                <Card.Img variant="top" src={player.imageURL} />
                <Card.Body>
                  <Card.Title><h3>{player.name}</h3></Card.Title>
                  <h4> ${convertDollar(player.cost)} </h4>
                  <p>{player.description}</p>
                  <h6>Category: {player.category}</h6>
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
      <div>
        <h2>Search Results</h2>
        <Form inline onSubmit={onSubmit}>
          <Form.Control type="text" placeholder="Search" onChange={handleChange} value={localSearch} />
          <Button className='search-btn' type="submit" variant="outline-info">Search</Button>
        </Form>
        <br />
        <h4>Sorry! Nothing matched your search. Please try again.</h4>
      </div>
    )
  }
}

export default withRouter(SearchPlayers)
