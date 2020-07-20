export default function fetchStatus(state=[], action) {
    switch(action.type) {
        case "GET_CURRENT_QC_FILES":
            return action.payload
        case "ADD_NEW_QC_FILE":
            return [...state, action.payload]
        default:
            return state
    }
}