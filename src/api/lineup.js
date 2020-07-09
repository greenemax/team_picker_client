import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLineup = user => {
  return axios({
    url: apiUrl + '/lineup-create',
    method: 'POST',
    data: {
      'lineup': {
        'lineupName': null
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateLineup = (user, lineupId, lineupName) => {
  return axios({
    url: apiUrl + '/lineup-edit' + lineupId,
    method: 'PATCH',
    data: {
      'lineup': {
        'lineupName': lineupName
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

export const deleteLineup = (user, id) => {
  return axios({
    url: `${apiUrl}/lineups/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    method: 'DELETE'
  })
}
