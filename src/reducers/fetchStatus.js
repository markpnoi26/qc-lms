export default function fetchStatus(state=false, action) {
    switch(action.type) {
        case "CURRENTLY_FETCHING":
            return true
        case "SUCCESS_FETCHING":
            return false
        case "FAILED_FETCHING":
            return false
        default:
            return false
    }
}