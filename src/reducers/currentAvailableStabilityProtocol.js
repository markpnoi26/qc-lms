export default function currentAvailableStabilityProtocol(state="", action) {
    switch(action.type) {
        case "SET_AVAILABLE_STABILITY_PROTOCOL":
            return action.payload
        default:
            return state
    }
}