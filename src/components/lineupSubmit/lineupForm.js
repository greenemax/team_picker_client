import React from 'react'
import { Link } from 'react-router-dom'

const LineupForm = ({ lineup, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Lineup Name</label>
    <input
      value={lineup.name}
      name="name"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default LineupForm
