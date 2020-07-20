import React from 'react'
import { API } from 'aws-amplify'


import QCRecordForm from '../components/qcRecordForm'

export default class QCRecordWindow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currQCFile: "20002",
        }
    }


    handleGetFiles = () => {
        
        const params ={
            headers:{},
            response: true,
            queryStringParameters: {}
        }

        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }


    handlePutFiles = () => {
        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
            body: {
                num: "20002",
                name: "Sample Name 2 (with some changes)"
            }
        }

        API.put("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }


    handleGetOneItem = () => {
        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
        }

        API.get("qcfilesAPI", "/qcfiles/20002", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDeleteFiles = () => {
        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
            body: {}
        }

        API.del("qcfilesAPI", "/qcfiles/20002", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    setNextQCFile = () => {
        let currQCFile = this.state.currQCFile
        let numberfied = parseInt(currQCFile, 10)
        numberfied++

        console.log(numberfied)
        this.setState({
            currQCFile: numberfied.toString()
        })
    }

    render() {
        return (
            <div>
                <div> Selection Filter by date/QC num/Other</div>

                <table>
                    <tbody>
                        <tr>
                            <th>QC Number</th>
                            <th>Project Type</th>
                            <th>Title</th>
                            <th>Requester</th>
                            <th>Tests</th>
                            <th>lot #</th>
                            <th>Sample Numbers</th>
                            <th>Date Started</th>
                            <th>Date Finished</th>
                            <th>Analyst</th>
                            <th>Update/Add/Delete</th>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                            <QCRecordForm currQCFile={this.state.currQCFile} setNextQCFile={this.setNextQCFile}/>
                        </tr>
                    </tbody>
                </table>




                
                <button onClick={this.handleGetFiles}> get files </button>
                <button onClick={this.handlePutFiles}> put something</button>
                <button onClick={this.handleDeleteFiles}> delete something</button>
                <button onClick={this.handleGetOneItem}> get one single item</button> 
            </div>
        )
    }
}