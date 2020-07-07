import React, { useState, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
// import PlayersPage from '../Players/playersPage'
// import Confirmation from '../LineupConfirm/lineupConfirm'
// import CurrentLineup from '../Lineup/currentLineup'
import LineupIndex from '../LineupHistory/lineupIndex'
import LineupShow from '../LineupHistory/lineupShow'
import LineupCreate from '../Lineup/lineupCreate'
import LineupUpdate from '../LineupName/lineupUpdate'

const App = () => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts([...msgAlerts, { heading, message, variant }])
  }

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
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={msgAlert} setUser={setUser}/>
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={msgAlert} setUser={setUser}/>
        )}/>
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user}/>
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword msgAlert={msgAlert} user={user}/>
        )} />
        <AuthenticatedRoute exact user={user} path="/lineups" component={LineupIndex}/>
        <AuthenticatedRoute exact user={user} path="/lineups/:id" component={LineupShow} />
        <AuthenticatedRoute exact user={user} path="/lineups-create" component={LineupCreate} />
        <AuthenticatedRoute exact user={user} path="/lineups-update/:id" component={LineupUpdate} />
      </main>
    </Fragment>
  )
}

export default App

// <AuthenticatedRoute exact path='/lineup' user={user} render={() => (
//   <CurrentLineup msgAlert={msgAlert} user={user}/>
// )} />
// <AuthenticatedRoute path='/confirmation' user={user} render={() => (
//   <Confirmation msgAlert={msgAlert} user={user}/>
// )} />
// <Route path='/players' render={() => (
//   <PlayersPage msgAlert={msgAlert} user={user} />
// )} />
