import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div>
    <nav>
      <Link to="/lineups">Lineup Page</Link>
      <Link to="/lineups-create">Create A Lineup</Link>
    </nav>
    {children}
    <footer>
      Developed by Max Greene
    </footer>
  </div>
)

export default Layout
