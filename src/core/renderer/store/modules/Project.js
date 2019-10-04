const state = {
  projectQueue: null,
  projects: {}
}

const mutations = {
  ADD_PROJECT_TO_QUEUE (state, payload) {
    state.projectQueue = payload
  },
  REMOVE_PROJECT_FROM_QUEUE (state) {
    state.projectQueue = null
  },
  ADD_PROJECT_TO_LIST (state, payload) {
    state.projects[payload.domain] = payload
  },
  REMOVE_PROJECT_FROM_LIST (state, domain) {
    delete state.projects[domain]
  },
  REMOVE_ALL_PROJECTS_FROM_LIST (state) {
    state.projects = {}
  }
}

const actions = {
  add_project_to_queue (store, payload) {
    return store.commit('ADD_PROJECT_TO_QUEUE', payload)
  },
  remove_project_from_queue (store) {
    return store.commit('REMOVE_PROJECT_FROM_QUEUE')
  },
  add_project_to_list (store, payload) {
    return store.commit('ADD_PROJECT_TO_LIST', payload)
  },
  remove_project_from_list (store, domain) {
    return store.commit('REMOVE_PROJECT_FROM_LIST', domain)
  },
  remove_all_projects_from_list (store) {
    return store.commit('REMOVE_ALL_PROJECTS_FROM_LIST')
  }
}

const getters = {
  projectQueue: state => {
    return state.projectQueue
  },
  projects: state => {
    return state.projects
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
