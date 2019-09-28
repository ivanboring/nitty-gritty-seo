const state = {
  projectQueue: null
}

const mutations = {
  ADD_PROJECT_TO_QUEUE (state, payload) {
    state.projectQueue = payload
  },
  REMOVE_PROJECT_FROM_QUEUE (state) {
    state.projectQueue = null
  }
}

const actions = {
  add_project_to_queue (store, payload) {
    return store.commit('ADD_PROJECT_TO_QUEUE', payload)
  },
  remove_project_from_queue (store, payload) {
    return store.commit('REMOVE_PROJECT_FROM_QUEUE', payload)
  }
}

const getters = {
  projectQueue: state => {
    return state.projectQueue
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
