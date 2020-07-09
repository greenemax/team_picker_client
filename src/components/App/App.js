import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
// import PlayersPage from '../Players/playersPage'
import Confirmation from '../LineupConfirm/lineupConfirm'
import CurrentLineup from '../Lineup/currentLineup'
import LineupIndex from '../LineupHistory/lineupIndex'
import LineupShow from '../LineupHistory/lineupShow'
import LineupCreate from '../Lineup/lineupCreate'
import LineupEdit from '../Lineup/lineupEdit'
import LineupDelete from '../Lineup/lineupDelete'
import Home from '../Home/home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container bodyContainer" >
          <AuthenticatedRoute exact path='/' user={user} render={() => (
            <Home msgAlert={msgAlerts} user={user}/>
          )} />
          <AuthenticatedRoute exact path='/lineup' user={user} render={() => (
            <CurrentLineup msgAlert={msgAlerts} user={user}/>
          )} />
          <AuthenticatedRoute path='/confirmation' user={user} render={() => (
            <Confirmation msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser}/>
          )} />
          <Route exact path="/sign-in" render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser}/>
          )} />

          <AuthenticatedRoute exact user={user} clearUser={user} path="/change-password" render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

          <AuthenticatedRoute exact user={user} path="/lineups" render={() => (
            <LineupIndex msgAlerts={msgAlerts} user={user}/>
          )}/>
          <AuthenticatedRoute exact user={user} path="/lineups/:id" render={() => (
            <LineupShow msgAlerts={msgAlerts} user={user}/>
          )}/>
          <AuthenticatedRoute exact user={user} path="/lineups-create" render={() => (
            <LineupCreate msgAlerts={msgAlerts} user={user}/>
          )} />
          <AuthenticatedRoute exact user={user} path="/lineups-edit/" render={() => (
            <LineupEdit msgAlerts={msgAlerts} user={user}/>
          )} />
          <AuthenticatedRoute exact user={user} path="/lineups-delete/" render={() => (
            <LineupDelete msgAlerts={msgAlerts} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
