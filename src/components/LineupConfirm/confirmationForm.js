import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { getHistory, changeLineupActive, createEmptyLineup } from '../../api/lineup'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

const ConfirmationForm = ({ lineup, msgAlert, user }) => {
  const [show, setShow] = useState(false)
  const [redirect, setRedirect] = useState(false)
  // const [cardToken, setCardToken] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = event => {
    event.preventDefault()
      .then(() => handleShow())
      .catch(() => {
        msgAlert({
          heading: 'Checkout Failed',
          message: messages.checkoutFailure,
          variant: 'danger'
        })
      })
  }

  const handleConfirmation = () => {
    changeLineupActive(lineup.totalCost)
      .then(() => getHistory(user))
      .then(data => {
        const lineup = data.data.lineup
        const activeLineup = lineup.find(lineup => lineup.active)
        activeLineup.active = false
        const id = activeLineup.id
        const boolean = activeLineup.active
        changeLineupActive(user, id, boolean)
      })
      .then(() => {
        createEmptyLineup(user)
      })
      .then(() => handleClose())
      .then(() => setRedirect(true))
      .catch(() => {
        msgAlert({
          heading: 'Confirmation Failed',
          message: messages.confirmationCompleteFailure,
          variant: 'danger'
        })
      })
  }

  if (!redirect) {
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="title">Review Your Lineup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {lineup.players.map((player, index) => (
              <div key={player._id}>
                <Card className="container">
                  <Card.Body className="lineupCost row" >
                    <Card.Img className="col-4" src={player.imageURL} />
                    <div className="col-8">
                      <Card.Title><h5>{player.name}:  {player.cost}</h5></Card.Title>
                      <Card.Text className="lineupCost"> <p>{lineup.quantities[index]} &emsp; for &emsp; ${player.cost}</p></Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <h3>Total:${lineup.totalCost} </h3>
            <Link to='/lineup'><Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button></Link>
            <Button variant="primary" onClick={handleConfirmation}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Form onSubmit={handleSubmit} className="container">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    )
  } else {
    return (
      <Redirect to='/players' />
    )
  }
}

export default ConfirmationForm
