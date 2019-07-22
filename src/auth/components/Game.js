import React, { Component } from 'react'
import Layout from '../shared/Layout'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect } from 'react-router-dom'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    // index request!!
    axios(`${apiUrl}/games/${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data.game }))
      .catch(err => this.setState({ error: err.stack }))
  }
  // DELETE BLOCK
  destroy = () => {
    // delete request
    axios({
      url: `${apiUrl}/game/${this.props.match.params.id}`,
      method: 'Delete'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(err => this.setState({ error: err.message }))
  }
  render () {
    const { game, error, deleted } = this.state
    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Game Successfully Deleted!!' } }
      } />
    }
    if (error) {
      return <p>ERROR: {error}</p>
    }
    if (!game) {
      return <p> Slow Down Buddy...</p>
    }

    return (
      <Layout>
        <h2> Your Game</h2>
        <h4>{game.title}</h4>
        <p> Date released: {game.year}</p>
        <p> Directed by: {game.company}</p>
        <Link to="/games">Back to Game</Link>
        <button onClick={this.destroy}>Delete Game</button>
        <Link to={`/games/${this.props.match.params.id}/edit`}>
          <button>Edit Game</button>
        </Link>
        <Link to="/games/:id/edit">Back to all Games</Link>
      </Layout>
    )
  }
}
// END DELETE BLOCK
export default Game
