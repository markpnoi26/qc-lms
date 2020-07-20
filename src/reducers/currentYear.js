export default function currentYear(state="", action) {
    let currDate, currYear
    switch(action.type) {
        case "GET_CURRENT_YEAR":
            currDate = new Date()
            currYear = currDate.getUTCFullYear()
            return JSON.stringify(currYear)
        default:
            currDate = new Date()
            currYear = currDate.getUTCFullYear()
            return JSON.stringify(currYear)
    }
}