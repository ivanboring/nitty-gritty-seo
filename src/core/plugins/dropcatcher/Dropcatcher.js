import { mapState } from 'vuex'

export default {
  computed: mapState(['Dropcatcher']),
  props: {
    source: String
  },
  data: () => ({
    dialog: true,
    populateOverlay: false
  }),
  methods: {
    startFetching () {
      this.populateOverlay = true
      this.$store.dispatch('fetch_dropped_domains', false)
      this.$store.dispatch('fetch_dropped_domains', true)
    }
  }
}
