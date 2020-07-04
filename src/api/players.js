import apiUrl from '../apiConfig'
import axios from 'axios'

export const getPlayers = () => {
  return axios({
    url: apiUrl + '/players'
  })
}

export const getOnePlayer = id => {
  return axios({
    url: apiUrl + '/players/' + id
  })
}

export const addToLineup = (id, player, user) => {
  return axios({
    url: apiUrl + '/lineup/' + id,
    method: 'PATCH',
    data: {
      'player': {
        'id': id
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const removeFromLineup = (id, player, playerId, user) => {
  return axios({
    url: apiUrl + `/lineup/${id}/players/${playerId}`,
    method: 'PATCH',
    data: {
      'player': {
        'id': id
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
