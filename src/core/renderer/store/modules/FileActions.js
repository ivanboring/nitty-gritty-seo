const state = {
  toSave: {}
}

const mutations = {
  ADD_FILE_CONTEXT_TO_SAVE (state, payload) {
    state.toSave = payload
  },
  REMOVE_FILE_CONTEXT_TO_SAVE (state) {
    state.toSave = {}
  }
}

const actions = {
  add_file_context_to_save (store, payload) {
    return store.commit('ADD_FILE_CONTEXT_TO_SAVE', payload)
  },
  remove_file_context_to_save (store) {
    return store.commit('REMOVE_FILE_CONTEXT_TO_SAVE')
  }
}

const getters = {
  fileToLoad: state => {
    return state.toSave
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
