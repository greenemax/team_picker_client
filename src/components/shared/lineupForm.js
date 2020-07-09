import React from 'react'
// import { createLineup } from '../../api/lineup'
// import Button from 'react-bootstrap/Button'
// const onCreateLineup = (event, user) => {
//   event.preventDefault()
//   // get all lineups belonging to current user
//   const lineupName = data.data.user.lineups.lineup.name
//   // const user = data.data.user
//   console.log(lineupName)
//   return createLineup(lineupName)
// }

const LineupForm = ({ lineup, handleChange, handleSubmit, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Lineup Name:</label>
    <input
      placeholder="Team Name"
      value={lineup.lineupName}
      name="name"
      onChange={handleChange}
    />
    <button type="submit" >Name Your Lineup</button>
  </form>
)

export default LineupForm
