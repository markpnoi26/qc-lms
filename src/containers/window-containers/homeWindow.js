import React from 'react'
import {connect} from 'react-redux'

class HomeWindow extends React.Component {

    componentDidMount = () => {
        this.props.setCurrentActiveWindow("home")
    }

    render() {
        return (
            <div>
                The Home Window is Under Construction
            </div>
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