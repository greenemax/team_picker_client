import apiUrl from '../apiConfig'
import axios from 'axios'

export const createEmptyLineup = user => {
  return axios({
    url: apiUrl + '/lineup',
    method: 'POST',
    data: {
      'lineup': {
        'players': [],
        'user': `${user._id}`,
        'active': true,
        'totalCost': 0
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const getHistory = user => {
  return axios({
    url: apiUrl + '/lineups',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const changeLineupActive = (user, id, boolean) => {
  return axios({
    url: apiUrl + `/lineup/${id}/active`,
    method: 'PATCH',
    data: {
      'lineup': {
        'active': boolean
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
