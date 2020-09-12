import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'

class QCRecentDateOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            windowFetching: false,
            qcFiles: []
        }
    }

    componentDidMount = () => {
        const currDate = new Date()
        const currYear = currDate.getUTCFullYear()

        const params = {
            headers: {},
            response: true,
            queryStringParameters: {
                currentYear: currYear
            }
        }

        this.setState({ windowFetching: true })
        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {

                response.data.sort((a, b) => {
                    return (b.dateIn.length - a.dateIn.length)
                })

                response.data.sort((a, b) => {
                    return (new Date(b.dateOut) - new Date(a.dateOut))
                })

                this.setState({
                    windowFetching: false,
                    qcFiles: response.data
                })
            })
            .catch(error => {
                this.setState({ windowFetching: false })
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h1>QC Files Out: </h1>
                <ul>
                    {this.state.qcFiles.slice(0, 15).map(file => <li>QC{file.num} -  {file.title} - { file.dateOut }</li>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentQCFiles: state.currentQCFiles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentQCFiles: (qcFiles) => dispatch({ type: "SET_CURRENT_QC_FILES", payload: qcFiles })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCRecentDateOut)