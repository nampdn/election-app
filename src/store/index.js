import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalElectors: localStorage.getItem('total_electors'),
    candidates: localStorage.getItem('candidates') ? JSON.parse(localStorage.getItem('candidates')) : []
  },
  getters: {
    totalElectors: state => state.totalElectors,
    candidates: state => state.candidates
  },
  actions: {
    deleteAllData ({commit}) {
      commit('DELETE_ALL_DATA')
    },
    setTotalElectors ({commit}, total) {
      commit('SET_TOTAL_ELECTORS', total)
    },
    addCandidate ({commit, state}, name) {
      let candidate = {
        name: name,
        votes: 0
      }
      candidate.id = state.candidates ? state.candidates.length : 0
      commit('ADD_CANDIDATE', candidate)
    },
    updateCandidate ({commit}, payload) {
      commit('UPDATE_CANDIDATE', payload)
    },
    deleteCandidate ({commit}, payload) {
      commit('DELETE_CANDIDATE', payload)
    },
    voteUp ({commit}, id) {
      commit('VOTE_UP', id)
    },
    voteDown ({commit}, id) {
      commit('VOTE_DOWN', id)
    }
  },
  mutations: {
    DELETE_ALL_DATA (state) {
      state.candidates = []
      state.totalElectors = ''
      localStorage.removeItem('candidates')
      localStorage.removeItem('total_electors')
    },
    SET_TOTAL_ELECTORS (state, total) {
      state.totalElectors = total
      localStorage.setItem('total_electors', total)
    },
    ADD_CANDIDATE (state, candidate) {
      state.candidates.push(candidate)
      localStorage.setItem('candidates', JSON.stringify(state.candidates))
    },
    UPDATE_CANDIDATE (state, payload) {
      let index = _.findIndex(state.candidates, (item) => {
        return item.id === payload.id
      })
      state.candidates[index].name = payload.name
      localStorage.setItem('candidates', JSON.stringify(state.candidates))
    },
    DELETE_CANDIDATE (state, payload) {
      state.candidates = _.remove(state.candidates, (item) => {
        return item.id !== payload.id
      })

      // reset candidate id
      state.candidates.forEach((candidate, index) => {
        candidate.id = index
      })
      localStorage.setItem('candidates', JSON.stringify(state.candidates))
    },
    VOTE_UP (state, id) {
      let index = _.findIndex(state.candidates, (item) => {
        return item.id === id
      })
      state.candidates[index].votes += 1
      if (state.candidates[index].votes >= state.totalElectors / 2) {
        state.candidates[index].passed = true
      }
      localStorage.setItem('candidates', JSON.stringify(state.candidates))
    },
    VOTE_DOWN (state, id) {
      let index = _.findIndex(state.candidates, (item) => {
        return item.id === id
      })
      if (state.candidates[index].votes === 0) {
        return
      }
      state.candidates[index].votes -= 1
      if (state.candidates[index].votes < state.totalElectors / 2) {
        state.candidates[index].passed = false
      }
      localStorage.setItem('candidates', JSON.stringify(state.candidates))
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
