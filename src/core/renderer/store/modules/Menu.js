const state = {
  items: {}
}

const mutations = {
  ADD_TOOLS_MENU_ITEM (state, payload) {
    var uniqueid = payload.weight + '-' + payload.id
    state.items[uniqueid] = payload
  },
  REMOVE_TOOLS_MENU_ITEM (state, payload) {

  }
}

const actions = {
  add_menu_item (store, payload) {
    store.commit('ADD_TOOLS_MENU_ITEM', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
