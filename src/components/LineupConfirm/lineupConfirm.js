import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ConfirmationForm from './confirmationForm'
import Accordion from 'react-bootstrap/Accordion'
import messages from '../AutoDismissAlert/messages'
import { getHistory } from '../../api/lineup'
import { deepIndexOf } from '../../lib/deep-index-of'

const Confirmation = ({ user, msgAlert, customer }) => {
  const [lineup, setLineup] = useState({
    players: [],
    totalCost: 0
  })
  console.log(lineup)

  const onShipSubmit = event => {
    event.preventDefault()
  }

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
          const currPlayer = activeLineup.players[i]
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
  }, [])

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="title">
        Billing Information
          </Card.Header>
          <Accordion.Collapse eventKey="0" className="container formText">
            <Card.Body><Form onSubmit={onShipSubmit} className="formText">
              <div className="row confirmButton">
                <Form.Group className="col-12">
                  <Accordion.Toggle className="uglyButton" eventKey="1">
                    <Accordion.Toggle className="uglyButton" eventKey="0"><Button className="goodButton" variant="primary" type="submit">
                    Submit
                    </Button>
                    </Accordion.Toggle>
                  </Accordion.Toggle>
                </Form.Group>
              </div>
            </Form></Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
              Confirm Team
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ConfirmationForm
                lineup={lineup}
                user={user}
                msgAlert={msgAlert}
              /> </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
export default Confirmation
