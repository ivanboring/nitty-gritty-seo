const state = {
  audits: []
}

const mutations = {
  ADD_AUDIT_TO_LIST (state, payload) {
    state.audits.push(payload)
  },
  CLEAN_AUDITS_FROM_LIST (state) {
    state.audits = []
  }
}

const actions = {
  add_audit_to_list (store, payload) {
    return store.commit('ADD_AUDIT_TO_LIST', payload)
  },
  clean_audits_from_list (store) {
    return store.commit('CLEAN_AUDITS_FROM_LIST')
  }
}

const getters = {
  audits: state => {
    return state.audits
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
