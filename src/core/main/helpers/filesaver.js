import store from '../../renderer/store'

store.watch(
  (state) => {
    return store.state.FileActions
  },
  (newValue, oldValue) => {
    console.log(store.getters.fileToLoad)
    store.dispatch('remove_file_context_to_save')
  },
  {
    deep: true
  }
)
