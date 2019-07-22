import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'
import GameForm from '../shared/MovieForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class GameCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: {
        title: '',
        company: '',
        year: ''
      },
      newMovieId: null
    }
  }

handleChange = event => {
// create an object with updated field
  const updatedField = {
    [event.target.name]: event.target.value
  }

  // se object to create update state object
  const editedGame = Object.assign(this.state.game, updatedField)

  // finally setState with updates object
  this.setState({ movie: editedGame })
}
handleSubmit = event => {
  event.preventDefault()
  axios.post(`${apiUrl}/game`, {
    game: this.state.game

  })
    .then(res => this.setState({ newGameId:
  res.data.game.id
    }))
    .catch(console.error)
}
render () {
  const { handleChange, handleSubmit } = this
  const { game, newGameId } = this.state
  if (newGameId) {
    return <Redirect to={`/game/${newGameId}`}/>
  }
  return (
    <Layout>
      <h4> Create a new game</h4>
      <GameForm
        movie={game}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}
}

export default GameCreate
