const state = {
  icon: '',
  website: ''
}

const mutations = {
  ADD_ICON_TO_QUEUE (state, payload) {
    state.icon = payload
  },
  REMOVE_ICON_FROM_QUEUE (state) {
    state.icon = ''
  },
  ADD_ICON_WEBSITE_TO_QUEUE (state, payload) {
    state.website = payload
  },
  REMOVE_ICON_WEBSITE_FROM_QUEUE (state) {
    state.website = ''
  }
}

const actions = {
  add_icon_to_queue (store, payload) {
    return store.commit('ADD_ICON_TO_QUEUE', payload)
  },
  remove_icon_from_queue (store) {
    return store.commit('REMOVE_ICON_FROM_QUEUE')
  },
  add_icon_website_to_queue (store, payload) {
    return store.commit('ADD_ICON_WEBSITE_TO_QUEUE', payload)
  },
  remove_icon_website_from_queue (store) {
    return store.commit('REMOVE_ICON_WEBSITE_FROM_QUEUE')
  }
}

const getters = {
  iconToLoad: state => {
    return state.icon
  },
  iconWebsiteToLoad: state => {
    return state.website
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
