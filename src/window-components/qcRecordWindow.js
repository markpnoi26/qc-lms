import React from 'react'
import { API } from 'aws-amplify'

export default class QCRecordWindow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            qcFiles: [
                {
                    qcNum: "20001", 
                    projectCode: "Release", 
                    title: "UP456-1 release from Worldway",
                    lotNums: ["FP101010", "FP101011", "FP101012"],
                    tests: ["HPLC", "C&A", "LOD", "OSR", "GCMS"],
                    dateIn: "01/23/2020",
                    dateOut: "01/30/2020",
                    nbPages: ["487p23", "490p17", "483p12-17"],
                    requester: "QC",
                    requesterName: null,
                    finished: true
                },
                {
                    qcNum: "20002", 
                    projectCode: "Stability", 
                    title: "UP456-1 T=12",
                    lotNums: ["FP101014", "FP101015", "FP101016"],
                    tests: ["HPLC", "C&A", "LOD", "OSR"],
                    dateIn: "01/24/2020",
                    dateOut: "01/31/2020",
                    nbPages: ["487p27", "490p18", "483p17-18"],
                    requester: "QC",
                    requesterName: null,
                    finished: true
                },
                {
                    qcNum: "20003", 
                    projectCode: "Project", 
                    title: "AloReckt-1 Polysaccharides",
                    lotNums: ["FP101019", "FP101020", "FP101021"],
                    tests: ["HPLC-SEC"],
                    dateIn: "02/01/2020",
                    dateOut: "02/03/2020",
                    nbPages: ["487p28", "490p20"],
                    requester: "NP",
                    requesterName: "Jordan P.",
                    finished: true
                }
            ]
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

    handlePostFiles = () => {
        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
            body: {
                qcNum: "20002",
                name: "Sample Name 2"
            }
        }

        API.post("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                Currently under QC record Window
                <button onClick={this.handleGetFiles}> get files </button>
                <button onClick={this.handlePostFiles}> post something</button>
            </div>
        )
    }
}