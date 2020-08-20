import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import QCRecentDateIn from '../home-containers/qcRecentDateIn'
import QCRecentDateOut from '../home-containers/qcRecentDateOut'
import StabilityUpcoming from '../home-containers/stabilityUpcoming'

class HomeWindow extends React.Component {

    componentDidMount = () => {
        this.props.setCurrentActiveWindow("home")
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col><QCRecentDateIn/></Col>
                    <Col><QCRecentDateOut/></Col>
                    <Col><StabilityUpcoming/></Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentActiveWindow: state.currentActiveWindow
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentActiveWindow: (window) => dispatch({ type: "SET_CURRENT_ACTIVE_WINDOW", payload: window })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWindow)