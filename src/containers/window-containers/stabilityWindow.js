import React from 'react'
import StabilityForm from '../../components/form-components/stabilityForm'
import StabilityEntry from '../../components/entry-components/stabilityEntry'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {API} from 'aws-amplify'


class StabilityWindow extends React.Component {

    componentDidMount = () => {

        this.props.getCurrentYear()
        const params ={
            headers:{},
            response: true,
            queryStringParameters: {}
        }

        this.props.currentlyFetching()
        API.get("stabilityAPI", "/stability", params)
            .then(response => {
                this.props.fetchSuccess()
                console.log(response)
            })
            .catch(error => {
                this.props.fetchFail()
                console.log(error)
                console.log({error})
            })
    }

    render() {
        return (
            <div>
                <Table bordered striped variant="dark" >
                    <thead>
                        <tr style={{ textAlign: "center" }} >
                            <th>Protocol</th>
                            <th>Products</th>
                            <th>Lot #</th>
                            <th>Spec #</th>
                            <th>Condition</th>
                            <th>Packaging</th>
                            <th>Amount/STP</th>
                            <th>Amount Unit</th>
                            <th>Amount/Time Point</th>
                            <th>Date Started</th>
                            <th>Pull Schedule</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr style={{ textAlign: "center" }}>
                            <StabilityEntry />
                        </tr>
                        <tr style={{ textAlign: "center" }}>
                            <StabilityForm />
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchStatus: state.fetchStatus,
        currentStabilityProtocols: state.currentStabilityProtocols,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAvailableStabilityProtocol: (protocol) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocol }),
        setCurrentStabilityProtocols: (protocols) => dispatch({ type: "SET_CURRENT_STABILITY_PROTOCOL", payload: protocols }),
        getCurrentYear: () => dispatch({ type: "GET_CURRENT_YEAR" }),
        currentlyFetching: () => dispatch({ type: "CURRENTLY_FETCHING" }),
        fetchSuccess: () => dispatch({ type: "SUCCESS_FETCHING" }),
        fetchFail: () => dispatch({ type: "FAILED_FETCHING" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StabilityWindow)