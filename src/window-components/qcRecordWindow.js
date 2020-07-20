import React from 'react'
import { API } from 'aws-amplify'


import QCRecordForm from '../components/qcRecordForm'

export default class QCRecordWindow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currQCFile: "20002",
            qcFiles: []
        }
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

    componentDidMount = () => {

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {}
        }

        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.setState({
                    qcFiles: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr style={{textAlign: "center"}}>
                            <th>QC Number</th>
                            <th>Project Type</th>
                            <th>Title</th>
                            <th>Tests</th>
                            <th>lot #</th>
                            <th>Sample #</th>
                            <th>Date In</th>
                            <th>Date Out</th>
                            <th>Req. by</th>
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
            </div>
            
        )
    }
}