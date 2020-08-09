export default function currentActiveWindow(state="", action) {
    switch(action.type) {
        case "SET_CURRENT_ACTIVE_WINDOW":
            return action.payload
        default:
            return state
    }
}