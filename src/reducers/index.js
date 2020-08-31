import { combineReducers } from 'redux'
import currentYear from './currentYear'
import currentQCFiles from './currentQCFiles'
import fetchStatus from './fetchStatus'
import currentAvailableQCFile from './currentAvailableQCFile'
import currentAvailableStabilityProtocol from './currentAvailableStabilityProtocol'
import currentStabilityProtocols from './currentStabilityProtocols'
import currentActiveWindow from './currentActiveWindow'
import searchBar from './searchBar'


export default combineReducers({
    searchBar,
    currentYear,
    currentQCFiles,
    currentStabilityProtocols,
    currentAvailableQCFile,
    currentAvailableStabilityProtocol,
    currentActiveWindow,
    fetchStatus
})
