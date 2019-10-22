const state = {
  percent_done: 0
}

const mutations = {
  PERCENT_DONE (state, payload) {
    state.percent_done = payload
  }
}

const actions = {
  percent_done (store, payload) {
    return store.commit('PERCENT_DONE', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
