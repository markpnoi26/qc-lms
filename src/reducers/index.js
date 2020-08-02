import { combineReducers } from 'redux'
import currentYear from './currentYear'
import currentQCFiles from './currentQCFiles'
import fetchStatus from './fetchStatus'
import currentAvailableQCFile from './currentAvailableQCFile'
import currentAvailableStabilityProtocol from './currentAvailableStabilityProtocol'
import currentStabilityProtocol from './currentStabilityProtocol'


export default combineReducers({
    currentYear,
    currentQCFiles,
    currentStabilityProtocol,
    currentAvailableQCFile,
    currentAvailableStabilityProtocol,
    fetchStatus
})
