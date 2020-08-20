export default function currentQCFiles(state=[], action) {
    switch(action.type) {
        case "SET_CURRENT_QC_FILES":
            return action.payload.sort((a,b) => a.num - b.num)
        case "ADD_NEW_QC_FILE":
            return [...state, action.payload].sort((a,b) => a.num - b.num)
        case "UPDATE_QC_FILES":
            return action.payload.sort((a,b) => a.num - b.num)
        default:
            return state
    }
}