import React from 'react'
import { API } from 'aws-amplify'

export default class StabilityUpcoming extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentlyFetching: false
        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div>Stability Upcoming</div>
        )
    }
}