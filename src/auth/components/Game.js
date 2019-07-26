import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect, withRouter } from 'react-router-dom'
import messages2 from '../messages2'

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
    // show request!!
    axios({
      url: `${apiUrl}/games/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}` }
    })
      .then(res => this.setState({ game: res.data.game }))
      .catch(err => this.setState({ error: err.stack }))
  }
  // DELETE BLOCK
 destroy = () => {
   axios({
     url: `${apiUrl}/games/${this.props.match.params.id}`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}` },
     method: 'DELETE'
   })
     .then(() => this.setState({ deleted: true }))
     .then(this.props.alert(messages2.deleteGameSuccess, 'success'))
     .catch(err => this.setState({ error: err.message }))
 }

 render () {
   const { game, deleted } = this.state
   if (!game) {
     return <p> Slow Down Buddy...</p>
   }
   if (deleted) {
     return <Redirect to={
       { pathname: '/games', state: { deleted: true } }
     } />
   }
   return (
     <div>
       <h2> Your Game</h2>
       <h4>{game.title}</h4>
       <p> Date released: {game.year_released}</p>
       <p> Directed by: {game.company}</p>
       <Link to="/games">Back to Games</Link>
       <button onClick={this.destroy}>Delete Game</button>
       <Link to={`/games/${this.props.match.params.id}/edit`}>
         <button>Edit Game</button>
       </Link>
     </div>
   )
 }
}
// END DELETE BLOCK
export default withRouter(Game)
