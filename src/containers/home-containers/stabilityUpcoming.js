import React from 'react'
import { API } from 'aws-amplify'

export default class StabilityUpcoming extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentlyFetching: false,
            stabilityProtocol: []
        }
    }

    componentDidMount = () => {

        const currDate = new Date()
        const currYear = currDate.getUTCFullYear()
        const prevYear = currYear - 5

        const params = {
            headers: {},
            response: true,
            queryStringParameters: {
                range: prevYear
            }
        }

        this.setState({currentlyFetching: true})
        API.get("stabilityAPI", "/stability", params)
            .then(response => {
                this.setState({ currentlyFetching: false })
                this.setState({ stabilityProtocol: response.data})
            })
            .catch(error => {
                this.setState({ currentlyFetching: false })
                console.log({ error })
            })
    }

    render() {
        return (
            <div>Stability Upcoming</div>
        )
    }
}