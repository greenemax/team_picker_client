import React from 'react'

const LineupForm = ({ lineup, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>Lineup Name:</label>
    <input
      placeholder="My New Team"
      value={lineup.name}
      name="name"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default LineupForm
