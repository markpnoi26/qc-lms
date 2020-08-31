import React from 'react'
import { API } from 'aws-amplify'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'


import QCRecordForm from '../../components/form-components/qcRecordForm'
import QCRecordEntry from '../../components/entry-components/qcRecordEntry'

class QCRecordWindow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        
        this.props.setCurrentActiveWindow("qcfiles")
        this.props.getCurrentYear()

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {
                currentYear: this.props.currentYear
            }
        }

        this.props.currentlyFetching()
        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.props.fetchSuccess()
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
                this.props.fetchFail()
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Table bordered striped variant="dark" size="sm" responsive="md">
                    <thead>
                        <tr style={{textAlign: "center"}} >
                            <th>QC</th>
                            <th>Project Type</th>
                            <th>Project Title</th>
                            <th>Tests</th>
                            <th>Lots</th>
                            <th>Count</th>
                            <th>Date In</th>
                            <th>Date Out</th>
                            <th>Requester</th>
                            <th>Analyst</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.currentQCFiles.filter(file => {
                            if (file.num.toLowerCase().includes(this.props.searchBar)) return file
                            if (file.title.toLowerCase().includes(this.props.searchBar)) return file
                            if (file.requester.toLowerCase().includes(this.props.searchBar)) return file
                            if (file.analyst.toLowerCase().includes(this.props.searchBar)) return file
                            if (file.lotNums.find(lot => lot.toLowerCase().includes(this.props.searchBar))) return file
                            if (file.dateIn.includes(this.props.searchBar)) return file
                            if (file.dateOut.includes(this.props.searchBar)) return file
                            return null
                        }).map(file => {
                            return (
                                <tr key={file.num} style={{textAlign: "center"}}>
                                    <QCRecordEntry file={file} />
                                </tr>
                            )
                        })}
                        
                        <tr style={{textAlign: "center"}}>
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
        currentYear: state.currentYear,
        searchBar: state.searchBar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAvailableQCFile: (number) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: number}),
        setCurrentQCFiles: (qcFiles) => dispatch({type: "SET_CURRENT_QC_FILES", payload: qcFiles}),
        setCurrentActiveWindow: (window) => dispatch({type: "SET_CURRENT_ACTIVE_WINDOW", payload: window}),
        getCurrentYear: () => dispatch({type: "GET_CURRENT_YEAR"}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCRecordWindow)