import React from 'react'
import { Link } from 'react-router-dom'

const GameForm = ({ game, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Title of Game"
      value={game.title}
      name="title"
      onChange={handleChange}
    />
    <label>Company</label>
    <input
      placeholder="Company"
      value={game.company}
      name="company"
      onChange={handleChange}
    />
    <label>Year</label>
    <input
      placeholder="Year"
      value={game.year}
      name="year"
      onChange={handleChange}
      type="date"
    />
    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>

)

export default GameForm
