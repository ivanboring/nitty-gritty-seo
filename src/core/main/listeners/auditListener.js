import store from '../../renderer/store'
import redirectChecker from '../jobs/redirectChecker'

store.watch(
  (state) => {
    return store.state.Audit
  },
  (newValue, oldValue) => {
    if (typeof newValue.activeAudits.domain !== 'undefined') {
      var runDomain = newValue.activeAudits.domain
      var runId = newValue.activeAudits.started
      store.dispatch('add_audit_to_project_list', newValue.activeAudits)
      store.dispatch('clean_audits_from_active_list')
      redirectChecker.checkAllRedirects(runDomain, runId)
      // TODO: Figure out the basics first
    }
  },
  {
    deep: true
  }
)
