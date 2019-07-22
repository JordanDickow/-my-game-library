import React, { Component } from 'react'
import Layout from '../shared/Layout'
import GameForm from '../shared/MovieForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class GameEdit extends Component {
  // intiliaze constructor, state
  constructor (props) {
    super(props)
    this.state = {
      game: {
        title: '',
        company: '',
        year: ''

      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data.game }))
      .catch(console.error)
  }
  handleSubmit = event => {
    event.prevent.Default()
    axios.patch(`${apiUrl}/movies/${apiUrl}/movies/${this.props.match.params.id}`,
      {
        movie: this.state.game
      })
      .then(res => this.setState({
        movie: res.data.game,
        edited: true
      }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const updatedGame = Object.assign(this.state.game, updatedField)
    this.setState({ game: updatedGame })
  }

  render () {
    const { game, edited } = this.state
    const { handleChange, handleSubmit } = this

    if (edited) {
      return <Redirect to={
        {
          pathname: `/games/${this.props.match.params.id}`,
          state: {
            msg: 'Game updated!'
          }
        }
      }/>
    }
    return (
      <Layout>
        <h3>Edit your game</h3>
        <GameForm
          movie={game}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/games/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}
export default GameEdit
