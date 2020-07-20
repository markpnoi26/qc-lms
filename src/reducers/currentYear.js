export default function currentYear(state="", action) {
    switch(action.type) {
        case "GET_CURRENT_YEAR":
            return action.payload
        default:
            const currDate = new Date()
            const currYear = currDate.getUTCFullYear()
            return currYear
    }
}