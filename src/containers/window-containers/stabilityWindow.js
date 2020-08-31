import React from 'react'
import StabilityForm from '../../components/form-components/stabilityForm'
import StabilityEntry from '../../components/entry-components/stabilityEntry'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {API} from 'aws-amplify'


class StabilityWindow extends React.Component {

    componentDidMount = () => {
        this.props.setCurrentActiveWindow("stability")
        this.props.getCurrentYear()

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {
                currentYear: this.props.currentYear
            }
        }

        this.props.currentlyFetching()
        API.get("stabilityAPI", "/stability", params)
            .then(response => {
                this.props.fetchSuccess()
                this.props.setCurrentStabilityProtocols(response.data)
            })
            .then(() => {
                const currentStabilityProtocols = this.props.currentStabilityProtocols
                let start = 1, stringedNum, stabilityProtocolNum

                for (let i = 0; i < currentStabilityProtocols.length; i++) {
                    stringedNum = start <= 9 ? `0${start}` : `${start}`
                    stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                    if (currentStabilityProtocols[i].stabilityProtocolNum !== stabilityProtocolNum) {
                        this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
                        return stabilityProtocolNum
                    }
                    start++
                }
                stringedNum = start <= 9 ? `0${start}` : `${start}`
                stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
            })
            .catch(error => {
                this.props.fetchFail()
                console.log({error})
            })
    }

    render() {
        return (
            <div>
                <Table bordered striped variant="dark" size="sm" responsive="md">
                    <thead>
                        <tr style={{ textAlign: "center", fontSize: "12px"}} >
                            <th>Protocol Number</th>
                            <th>Products</th>
                            <th>Lot #</th>
                            <th>Spec #</th>
                            <th>Condition (°C/%RH)</th>
                            <th>Packaging</th>
                            <th>Amount/STP</th>
                            <th>Amount/Time Point</th>
                            <th>Unit</th>
                            <th>Date Started</th>
                            <th>Protocol & Schedule</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.currentStabilityProtocols.filter(protocol => {
                            if (protocol.stabilityProtocolNum.toLowerCase().includes(this.props.searchBar)) return protocol
                            if (protocol.condition.toLowerCase().includes(this.props.searchBar)) return protocol
                            if (protocol.packaging.toLowerCase().includes(this.props.searchBar)) return protocol
                            if (protocol.lotNums.find(lot => lot.toLowerCase().includes(this.props.searchBar))) return protocol
                            if (protocol.products.find(product => product.toLowerCase().includes(this.props.searchBar))) return protocol
                            return null
                        }).map(protocol => {
                            return (
                                <tr key={protocol.stabilityProtocolNum} style={{ textAlign: "center" }}>
                                    <StabilityEntry protocol={protocol} />
                                </tr>
                            )
                        })}
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
        currentYear: state.currentYear,
        searchBar: state.searchBar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAvailableStabilityProtocol: (protocol) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocol }),
        setCurrentStabilityProtocols: (protocols) => dispatch({ type: "SET_CURRENT_STABILITY_PROTOCOLS", payload: protocols }),
        setCurrentActiveWindow: (window) => dispatch({type: "SET_CURRENT_ACTIVE_WINDOW", payload: window}),
        getCurrentYear: () => dispatch({ type: "GET_CURRENT_YEAR" }),
        currentlyFetching: () => dispatch({ type: "CURRENTLY_FETCHING" }),
        fetchSuccess: () => dispatch({ type: "SUCCESS_FETCHING" }),
        fetchFail: () => dispatch({ type: "FAILED_FETCHING" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StabilityWindow)