export default function currentStabilityProtocols(state=[], action) {
    switch(action.type) {
        case "SET_CURRENT_STABILITY_PROTOCOLS":
            return action.payload.sort((a,b) => a.stabilityProtocolNum - b.stabilityProtocolNum)
        case "ADD_NEW_STABILITY_PROTOCOL":
            return [...state, action.payload].sort((a,b) => a.stabilityProtocolNum - b.stabilityProtocolNum)
        case "UPDATE_STABILITY_PROTOCOLS":
            return action.payload.sort((a,b) => a.stabilityProtocolNum - b.stabilityProtocolNum)
        default:
            return state
    }
}