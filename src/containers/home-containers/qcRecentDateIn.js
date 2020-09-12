import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import { Table } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

class QCRecentDateIn extends React.Component {
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

                response.data.sort((a,b) => {
                    return (b.dateIn.length - a.dateIn.length)
                })

                response.data.sort((a, b) => {
                    return (new Date(b.dateIn) - new Date(a.dateIn))
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
                <h4>Latest QC Files Initiated:</h4>
                <Table variant="dark" striped>
                    <thead>
                        <tr>
                            <td>
                                File
                            </td>
                            <td>
                                Title
                            </td>
                            <td>
                                Date In
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.qcFiles.slice(0,5).map(file => {
                            return (
                                <tr key={uuidv4()}>
                                    <td>
                                        QC{file.num}
                                    </td>
                                    <td>
                                        {file.title}
                                    </td>
                                    <td>
                                        {file.dateIn}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(QCRecentDateIn)
