const state = {
  routes: {}
}

const mutations = {
  ADD_ROUTE_ITEM (state, payload) {
    state.routes[payload.path] = payload
  },
  REMOVE_ROUTE_ITEM (state, payload) {

  }
}

const actions = {
  add_route_item (store, payload) {
    store.commit('ADD_ROUTE_ITEM', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
