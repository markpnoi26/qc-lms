export default function currentAvailableQCFile(state="", action) {
    switch(action.type) {
        case "SET_AVAILABLE_QC_FILE":
            return action.payload
        default:
            return state
    }
}