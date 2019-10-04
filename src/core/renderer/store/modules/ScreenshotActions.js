const state = {
  toSave: {}
}

const mutations = {
  ADD_SCREENSHOT_TO_TAKE (state, payload) {
    state.toSave = payload
  },
  REMOVE_SCREENSHOT_TO_TAKE (state) {
    state.toSave = {}
  }
}

const actions = {
  add_screenshot_to_take (store, payload) {
    return store.commit('ADD_SCREENSHOT_TO_TAKE', payload)
  },
  remove_screenshot_to_take (store) {
    return store.commit('REMOVE_SCREENSHOT_TO_TAKE')
  }
}

const getters = {
  screenshotToTake: state => {
    return state.toSave
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
