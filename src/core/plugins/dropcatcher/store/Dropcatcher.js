const state = {
  percent_done: 0,
  fetch_domains: false,
  downloads: 0,
  drop_days: 0
}

const mutations = {
  DROP_PERCENT_DONE (state, payload) {
    state.percent_done = payload
  },
  DROP_ADD_PERCENT_DONE (state, payload) {
    var newValue = payload + state.percent_done
    state.percent_done = newValue >= 100 ? 100 : newValue
  },
  FETCH_DROPPED_DOMAINS (state, payload) {
    state.fetch_domains = payload
  },
  REMOVE_ONE_DROP_DOWNLOAD (state) {
    state.downloads = state.downloads - 1
  },
  SET_DROP_DOWNLOADS (state, payload) {
    state.downloads = payload
  },
  SET_DROP_DAYS (state, payload) {
    state.drop_days = payload
  }
}

const actions = {
  percent_done (store, payload) {
    return store.commit('DROP_PERCENT_DONE', payload)
  },
  add_to_percent_done (store, payload) {
    return store.commit('DROP_ADD_PERCENT_DONE', payload)
  },
  fetch_dropped_domains (store, payload) {
    return store.commit('FETCH_DROPPED_DOMAINS', payload)
  },
  remove_one_drop_download (store) {
    return store.commit('REMOVE_ONE_DROP_DOWNLOAD')
  },
  set_drop_downloads (store, payload) {
    return store.commit('SET_DROP_DOWNLOADS', payload)
  },
  set_drop_days (store, payload) {
    return store.commit('SET_DROP_DAYS', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
