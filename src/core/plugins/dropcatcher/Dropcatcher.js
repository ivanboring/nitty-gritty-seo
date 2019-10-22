import { mapState } from 'vuex'

export default {
  computed: mapState(['Dropcatcher']),
  props: {
    source: String
  },
  data: () => ({
    dialog: true,
    populateOverlay: false
  })
}
