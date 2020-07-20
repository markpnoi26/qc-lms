import { combineReducers } from 'redux'
import currentYear from './currentYear'
import currentQCFiles from './currentQCFiles'
import fetchStatus from './fetchStatus'
import currentAvailableQCFile from './currentAvailableQCFile'


export default combineReducers({
    currentYear,
    currentQCFiles,
    currentAvailableQCFile,
    fetchStatus
})
