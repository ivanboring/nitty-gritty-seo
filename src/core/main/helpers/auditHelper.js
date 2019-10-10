import store from '../../renderer/store'

var auditHelper = {
  addSuccessAudit (auditId, auditDomain, message, extraData) {
    console.log('dispatched')
    store.dispatch('add_successful_test_to_audit', {
      id: auditId,
      domain: auditDomain
    })
  }
}

export default auditHelper
