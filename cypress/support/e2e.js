import './action-commands'
import './verification-commands'

import 'cypress-real-events/support'
import registerCypressGrep from '@cypress/grep/src/support'
import 'cypress-mochawesome-reporter/register'

registerCypressGrep()
