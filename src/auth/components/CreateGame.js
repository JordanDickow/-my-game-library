import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GameForm from './GameForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class CreateGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: {
        title: '',
        company: '',
        year: ''
      },
      newGameId: null
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
  this.setState({ game: editedGame })
}
handleSubmit = event => {
  event.preventDefault()
  axios.post(`${apiUrl}/games`, {
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
    return <Redirect to={`/games/${newGameId}`}/>
  }
  return (
    <div>
      <h4> Create a new game</h4>
      <GameForm
        game={game}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}
}

export default CreateGame
