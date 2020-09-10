export default function currentYear(state="", action) {
    let currDate, currYear
    switch(action.type) {
        case "SET_CURRENT_YEAR":
            currDate = new Date()
            currYear = currDate.getUTCFullYear()
            return JSON.stringify(currYear)
        case "UPDATE_YEAR":
            return action.payload
        default:
            return state
    }
}