import React, { Component } from 'react'
import GameForm from './GameForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

class GameEdit extends Component {
  // intiliaze constructor, state
  constructor (props) {
    super(props)
    this.state = {
      game: {
        title: '',
        company: '',
        year_released: ''

      },
      updated: false
    }
  }
  componentDidMount () {
    event.preventDefault()
    axios(`${apiUrl}/games/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data.game }))
      .catch(console.error)
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: apiUrl + `/games/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      },
      data: { game: this.state.game }
    })
      .then(res => this.setState({
        game: res.data.game,
        updated: true
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
    const { game, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
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
      <div>
        <h3>Edit your game</h3>
        <GameForm
          game={game}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/games/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}
export default withRouter(GameEdit)
