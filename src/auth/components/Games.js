import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'

class Games extends Component {
  constructor (props) {
    super(props)

    this.state = {
      games: [],
      loaded: false,
      error: null
    }
  }

  async componentDidMount () {
    // api request!!
    // axios(`${apiUrl}/movies`)
    //   .then(res => this.setState({ movies: res.data.movies, loaded: true }))
    //   .catch(err => this.setState({ error: err.message }))
    try {
      const response = await axios(`${apiUrl}/games`)
      this.setState({ games: response.data.games, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }
  render () {
    const { game, error, loaded } = this.state
    const gamesList = game.map(movie => (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>{game.title}</Link>
      </li>

    ))
    if (!loaded) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    return (
      <Layout>
        <h4>Your Games</h4>
        <ul>
          {gamesList}
        </ul>
      </Layout>
    )
  }
}

export default Games
