import apiUrl from '../apiConfig'
import axios from 'axios'

export const addToLineup = (lineupId, playerId, user) => {
  return axios({
    url: apiUrl + '/lineup/' + lineupId,
    method: 'PATCH',
    data: {
      'player': {
        'playerId': playerId
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

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

export const removeFromLineup = (lineupId, playerId, user) => {
  return axios({
    url: apiUrl + `/lineup/${lineupId}/players/${playerId}/`,
    method: 'PATCH',
    data: {
      'player': {
        'playerId': playerId
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
