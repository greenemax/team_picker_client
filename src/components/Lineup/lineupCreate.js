import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './apiConfig.js'
import LineupForm from './shared/lineupNameForm.js'
import Layout from './shared/Layout'

class LineupCreate extends Component {
  constructor () {
    super()

    this.state = {
      lineup: {
        name: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/lineup/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
        this.setState({ lineup: res.data.lineup })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    // 1. create an object with the key as the name prop, the value as the value
    const updatedField = { [event.target.name]: event.target.value }
    // 2. combine the updatedField with the current state with Object.assign
    // const updatedBook = Object.assign(this.state.book, updatedField)
    // 3. Set the state with the updatedBook
    // this.setState({ book: updatedBook })

    this.setState(currentState => {
      return { lineup: { ...currentState.lineup, ...updatedField } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/lineup/${this.props.match.params.id}`,
      data: {
        lineup: this.state.lineup
      }
    })
      .then(res => {
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  render () {
    const { lineup, updated } = this.state

    if (updated) {
      return <Redirect to={`/lineups/${this.props.match.params.id}`}/>
    }

    return (
      <Layout>
        <h2>Book Update Page</h2>
        <LineupForm
          lineup={lineup}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default LineupCreate
