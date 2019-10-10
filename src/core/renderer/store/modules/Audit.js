import Vue from 'vue'

const state = {
  activeAudits: {},
  projectAudits: {}
}

const mutations = {
  ADD_SUCCESSFUL_TEST_TO_AUDIT (state, payload) {
    for (var audit of state.projectAudits[payload.domain]) {
      if (audit['started'] === payload.id) {
        audit['totalTests']++
      }
    }
  },
  ADD_AUDIT_TO_ACTIVE_LIST (state, payload) {
    if (typeof payload.status === 'undefined') {
      payload.status = Object.keys(state.activeAudits).length > 0 ? 'Queued' : 'Running'
    }
    var d = new Date()
    var w = d.getUTCFullYear() + '/' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds()
    payload.started = Math.floor(d / 1000)
    payload.datetime = w
    payload.pages = 0
    payload.totalTests = 0
    payload.errors = 0
    payload.warnings = 0
    payload.notices = 0
    state.activeAudits = payload
  },
  CLEAN_AUDITS_FROM_ACTIVE_LIST (state) {
    state.activeAudits = {}
  },
  ADD_AUDIT_TO_PROJECT_LIST (state, payload) {
    if (typeof state.projectAudits[payload.domain] === 'undefined') {
      Vue.set(state.projectAudits, payload.domain, [])
    }
    state.projectAudits[payload.domain].unshift(payload)
  },
  EDIT_AUDIT_ON_PROJECT_LIST (state, payload) {
    // Always the first that is running
    if (typeof state.projectAudits[payload.domain] !== 'undefined' &&
        typeof state.projectAudits[payload.domain][0] !== 'undefined' &&
        state.projectAudits[payload.domain].status !== 'Finished') {
      state.projectAudits[payload.domain][0] = payload
    }
  },
  CLEAN_NON_FINISHED_AUDITS_FROM_PROJECT_LIST (state, payload) {
    if (typeof state.projectAudits[payload.domain] !== 'undefined') {
      var newStatus = []
      for (var i in state.projectAudits[payload.domain]) {
        if (state.projectAudits[payload.domain][i].status === 'Finished') {
          newStatus.push(state.projectAudits[payload.domain][i])
        }
      }
      state.projectAudits[payload.domain] = newStatus
    }
  },
  CLEAN_AUDITS_FROM_PROJECT_LIST (state, payload) {
    state.projectAudits[payload.domain] = []
  }
}

const actions = {
  add_successful_test_to_audit (store, payload) {
    return store.commit('ADD_SUCCESSFUL_TEST_TO_AUDIT', payload)
  },
  add_audit_to_active_list (store, payload) {
    return store.commit('ADD_AUDIT_TO_ACTIVE_LIST', payload)
  },
  clean_audits_from_active_list (store) {
    return store.commit('CLEAN_AUDITS_FROM_ACTIVE_LIST')
  },
  add_audit_to_project_list (store, payload) {
    return store.commit('ADD_AUDIT_TO_PROJECT_LIST', payload)
  },
  edit_audit_on_project_list (store, payload) {
    return store.commit('EDIT_AUDIT_ON_PROJECT_LIST', payload)
  },
  clean_non_finished_audits_from_project_list (store, payload) {
    return store.commit('CLEAN_NON_FINISHED_AUDITS_FROM_PROJECT_LIST', payload)
  },
  clean_audits_from_project_list (store, payload) {
    return store.commit('CLEAN_AUDITS_FROM_PROJECT_LIST', payload)
  }
}

const getters = {
  activeAudits: state => {
    return state.activeAudits
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
