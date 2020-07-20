import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'

class QCRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: this.props.currQCFile,
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
                uvVis: false

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
        console.log("Adding... new QC file")
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

        this.props.setNextQCFile()

        this.props.currentlyFetching()
        API.post("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                // This will be the response, will be able to add to the list of tests
                // call REDUX Dispatch here:
                console.log(response.config.data)
                this.props.addQCFile(response.config.data)
                this.props.fetchSuccess()
            })
            .catch(error => {
                // continue to log error just in case
                console.log(error)
                this.props.fetchFail()
            })

        this.setState({
            num: this.props.nextQCFile,
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
                uvVis: false

            },
            lotNums: [],
            analyst: "",
            dateIn: this.setDateToday(),
            currLotNum: ""
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({num: newProps.currQCFile});
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
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    
                                    <td>
                                        <input type="checkbox" value="hplc" checked={this.state.tests.hplc} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>HPLC</td>

                                    <td>
                                        <input type="checkbox" value="colorAndAppearance" checked={this.state.tests.colorAndAppearance} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>C&A</td>
                                    <td>
                                        <input type="checkbox" value="lod" checked={this.state.tests.lod} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>LOD</td>
                                    
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <input type="checkbox" value="osr" checked={this.state.tests.osr} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>OSR</td>

                                
                                    <td>
                                        <input type="checkbox" value="gcms" checked={this.state.tests.gcms} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>GC/MS</td>
                                    
                                    
                                    <td>
                                        <input type="checkbox" value="hptlc" checked={this.state.tests.hptlc} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>HPTLC</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" value="uvVis" checked={this.state.tests.uvVis} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>UV-Vis</td>
                                    <td>
                                        <input type="checkbox" value="pesticides" checked={this.state.tests.pesticides} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Pestic.</td>
                                    <td>
                                        <input type="checkbox" value="heavyMetals" checked={this.state.tests.heavyMetals} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>H/M</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        
                    </form>
                </td>
                <td>
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
                </td>
                <td style={{textAlign:"center"}}>
                    {this.state.lotNums.length}
                </td>
                <td>
                    {this.state.dateIn}
                </td>
                <td>
                    N/A
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
                    
                <td style={{textAlign:"center"}}>
                    <button onClick={this.handleSubmitNewFile}> Add File</button>
                </td>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQCFile: (qcFile) => dispatch({type: "ADD_NEW_QC_FILE", payload: qcFile}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}
  

export default connect(null, mapDispatchToProps)(QCRecordForm)