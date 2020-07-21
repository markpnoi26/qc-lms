import React from 'react'
import { API } from 'aws-amplify'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'


import QCRecordForm from '../components/qcRecordForm'
import QCRecordEntry from '../components/qcRecordEntry'

class QCRecordWindow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    // handlePutFiles = () => {
    //     const params = {
    //         headers:{},
    //         response: true,
    //         queryStringParameters: {},
    //         body: {
    //             num: "20002",
    //             name: "Sample Name 2 (with some changes)"
    //         }
    //     }

    //     API.put("qcfilesAPI", "/qcfiles", params)
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }


    // handleGetOneItem = () => {
    //     const params = {
    //         headers:{},
    //         response: true,
    //         queryStringParameters: {},
    //     }

    //     API.get("qcfilesAPI", "/qcfiles/20002", params)
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // handleDeleteFiles = () => {
    //     const params = {
    //         headers:{},
    //         response: true,
    //         queryStringParameters: {},
    //         body: {}
    //     }

    //     API.del("qcfilesAPI", "/qcfiles/20002", params)
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // setNextQCFile = () => {
    //     let currQCFile = this.state.currQCFile
    //     let numberfied = parseInt(currQCFile, 10)
    //     numberfied++

    //     console.log(numberfied)
    //     this.setState({
    //         currQCFile: numberfied.toString()
    //     })
    // }

    componentDidMount = () => {

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {}
        }

        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.props.setCurrentQCFiles(response.data)
            })
            .then(() => {
                // set the next available qc file
            
                const currentQCFiles = this.props.currentQCFiles
                const start = this.props.currentYear.substring(2,4) + "001"
                
                let startQCFile = parseInt(start, 10)
                for (let i = 0; i<currentQCFiles.length; i++) {
                    const stringedFileNum = JSON.stringify(startQCFile)
                    if (currentQCFiles[i].num !== stringedFileNum) {
                        this.props.setCurrentAvailableQCFile(stringedFileNum)
                        return stringedFileNum
                    }
                    startQCFile++
                }
                this.props.setCurrentAvailableQCFile(JSON.stringify(startQCFile))
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Table bordered hover >
                    <thead>
                        <tr style={{textAlign: "center"}} >
                            <th>QC Number</th>
                            <th>Project Type</th>
                            <th>Project Title</th>
                            <th>Tests</th>
                            <th>lot #</th>
                            <th>Sample #</th>
                            <th>Date In</th>
                            <th>Date Out</th>
                            <th>Req. by</th>
                            <th>Analyst</th>
                            <th>Update/Add/Delete</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.currentQCFiles.map(file => {
                            return (
                                <tr key={file.num} style={{textAlign: "center"}}>
                                    <QCRecordEntry file={file} />
                                </tr>
                            )
                        })}
                        
                        <tr >
                            <QCRecordForm />
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
        currentQCFiles: state.currentQCFiles,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAvailableQCFile: (number) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: number}),
        setCurrentQCFiles: (qcFiles) => dispatch({type: "SET_CURRENT_QC_FILES", payload: qcFiles})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCRecordWindow)