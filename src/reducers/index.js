import { combineReducers } from 'redux'
import currentYear from './currentYear'
import currentQCFiles from './currentQCFiles'
import fetchStatus from './fetchStatus'
import currentAvailableQCFile from './currentAvailableQCFile'
import currentAvailableStabilityProtocol from './currentAvailableStabilityProtocol'
import currentStabilityProtocols from './currentStabilityProtocols'


export default combineReducers({
    currentYear,
    currentQCFiles,
    currentStabilityProtocols,
    currentAvailableQCFile,
    currentAvailableStabilityProtocol,
    fetchStatus
})
