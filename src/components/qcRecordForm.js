import React from 'react'
import {API} from 'aws-amplify'

export default class QCRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: "20002",
            projectType: "",
            title: "",
            requester: "",
            tests: {
                hplc: false,
                colorAndAppearance: false,
                lod: false,
                heavyMetals: false,
                osr: false,
                gcms: false,
                pesticides: false,
                hptlc: false,

            },
            lotNums: [],
            analyst: "",
            dateIn: this.setDateToday(),
            currLotNum: ""
        }
    }

    setDateToday = () => {
        const dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; 
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        const dateToday = `${month}-${day}-${year}`;

        return dateToday
    }

    handleTestsOnCheck = (event) => {
        this.setState({
            ...this.state,
            tests: {
                ...this.state.tests,
                [event.target.value]: !this.state.tests[event.target.value] 
            }
        })
    }

    handleAddNewLot = (event) => {
        event.preventDefault()
        if (this.state.currLotNum === "") return

        const currLot = this.state.currLotNum
        const newLotCollection = this.state.lotNums
        newLotCollection.push(currLot)
        this.setState({
            lotNums: newLotCollection,
            currLotNum: ""
        })
    }

    handleDeleteLot = (event) => {
        const idxOfTarget = this.state.lotNums.indexOf(event.target.value)
        const newLotCollection = this.state.lotNums
        newLotCollection.splice(idxOfTarget, 1)
        this.setState({
            lotNums: newLotCollection
        })
    }

    handleSubmitNewFile = (event) => {
        console.log("adding... new QC file")
        const bodyPreSend = {...this.state, tests: {...this.state.tests}}
        delete bodyPreSend.currLotNum


        if (bodyPreSend.title === "" ) alert("Please make sure title exists.")
        if (bodyPreSend.projectType === "" ) alert("Please make sure you assign the project type.")

        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
            body: bodyPreSend
        }

        API.post("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                // This will be the response will be able to add to the list of tests
                console.log(response)
            })
            .catch(error => {
                // continue to log error just in case
                console.log(error)
            })
    }

    handlePostFiles = () => {
        

        
    }
    
    render() {
        return(
            <>
                <td>
                    {this.state.num}
                </td>
                <td>
                    <select 
                        value={this.state.projectType} 
                        onChange={(event) => this.setState({
                            projectType: event.target.value
                        })}
                    >
                        <option value="">Select Projet Type</option>
                        <option value="P">Project</option>
                        <option value="S">Stability</option>
                        <option value="I">Investigation</option>
                        <option value="R">Release</option>
                        <option value="SQ">Standard Qualification</option>

                    </select>
                </td>
                <td>
                    <form>
                        <input 
                            placeholder="Title" 
                            value={this.state.title} 
                            onChange={(event) => this.setState({
                                title: event.target.value
                            })}
                        >
                        </input>
                    </form>
                    
                </td>
                <td>
                    <select 
                        value={this.state.requester} 
                        onChange={(event) => this.setState({
                            requester: event.target.value
                        })}
                    >
                        <option value="">(none)</option>
                        <option value="QC">QC</option>
                        <option value="NP">NP</option>
                        <option value="Other">Other</option>
                    </select>
                </td>
                <td>
                    <form>
                        <label> HPLC:
                            <input type="checkbox" value="hplc" checked={this.state.tests.hplc} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> Color and Appearance:
                            <input type="checkbox" value="colorAndAppearance" checked={this.state.tests.colorAndAppearance} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> Loss On Dry:
                            <input type="checkbox" value="lod" checked={this.state.tests.lod} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> Heavy Metals:
                            <input type="checkbox" value="heavyMetals" checked={this.state.tests.heavyMetals} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> OSR:
                            <input type="checkbox" value="osr" checked={this.state.tests.osr} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> GC/MS:
                            <input type="checkbox" value="gcms" checked={this.state.tests.gcms} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> Pesticides:
                            <input type="checkbox" value="pesticides" checked={this.state.tests.pesticides} onChange={this.handleTestsOnCheck}/>
                        </label>
                        <label> HPTLC:
                            <input type="checkbox" value="hptlc" checked={this.state.tests.hptlc} onChange={this.handleTestsOnCheck}/>
                        </label>
                    </form>
                </td>
                <td>
                    <ul>
                        {this.state.lotNums.map((lot, idx) => (
                            <li 
                                key={idx}> 
                                {lot} 
                                <button 
                                    value={lot} 
                                    onClick={this.handleDeleteLot}> 
                                    - 
                                </button>
                            </li> 
                            )
                        )}
                    </ul>
                    <form>
                        <input 
                            value={this.state.currLotNum} 
                            placeholder="New Lot" 
                            onChange={(event) => {
                                this.setState({
                                    currLotNum: event.target.value
                                })
                            }}
                        />
                        <button onClick={this.handleAddNewLot}>+</button>
                    </form>
                </td>
                <td>
                    {this.state.lotNums.length}
                </td>
                <td>
                    {this.state.dateIn}
                </td>
                <td>
                    NotApplicable
                </td>

                <td>
                    <select 
                        value={this.state.analyst} 
                        onChange={(event) => this.setState({
                            analyst: event.target.value
                        })}
                    >
                        <option value="">(none)</option>
                        <option value="MD">MD</option>
                        <option value="KH">KH</option>
                        <option value="WM">WM</option>
                    </select>
                </td>
                    
                <td>
                    <button onClick={this.handleSubmitNewFile}> Add File</button>
                </td>
            </>
        )
    }
}