export default function currentStabilityProtocols(state=[], action) {
    switch(action.type) {
        case "SET_CURRENT_STABILITY_PROTOCOLS":
            return action.payload.sort((a,b) => a.num - b.num)
        case "ADD_NEW_STABILITY_PROTOCOL":
            return [...state, action.payload].sort((a,b) => a.num - b.num)
        case "UPDATE_STABILITY_PROTOCOL":
            return action.payload.sort((a,b) => a.num - b.num)
        default:
            return state
    }
}