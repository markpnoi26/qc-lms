import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'

import {Button, Form, InputGroup, FormControl} from 'react-bootstrap'

class QCRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: this.props.currentAvailableQCFile,
            projectType: "",
            title: "",
            requester: "",
            tests: {
                hplc: false,
                sec: false,
                colorAndAppearance: false,
                lod: false,
                ash: false,
                particleSize: false,
                solids: false,
                odor: false,
                meltingPoint: false,
                ftir: false,
                nmr: false,
                heavyMetals: false,
                osr: false,
                gcms: false,
                pesticides: false,
                hptlc: false,
                totalPlateCount: false,
                coliform: false,
                yeastAndMold: false,
                eColi: false,
                salmonella: false,
                arsenic: false,
                lead: false,
                mercury: false,
                cadmium: false,
                uvVis: false
            },
            lotNums: [],
            analyst: "",
            dateIn: this.setDateToday(),
            dateOut: "",
            nbPage: "",
            notes: "",
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

        this.props.currentlyFetching()
        API.post("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                const data = JSON.parse(response.config.data)
                return data
            })
            .then((data) => {
                this.props.addQCFile(data)
                this.props.fetchSuccess()
            })
            .then(() => {
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
                sec: false,
                colorAndAppearance: false,
                lod: false,
                ash: false,
                particleSize: false,
                solids: false,
                odor: false,
                meltingPoint: false,
                ftir: false,
                nmr: false,
                heavyMetals: false,
                osr: false,
                gcms: false,
                pesticides: false,
                hptlc: false,
                totalPlateCount: false,
                coliform: false,
                yeastAndMold: false,
                eColi: false,
                salmonella: false,
                arsenic: false,
                lead: false,
                mercury: false,
                cadmium: false,
                uvVis: false
            },
            lotNums: [],
            analyst: "",
            dateIn: this.setDateToday(),
            dateOut: "",
            nbPage: "",
            notes: "",
            currLotNum: ""
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.currentAvailableQCFile !== prevState.num){
            return {num : nextProps.currentAvailableQCFile};
        }
        return null;
    }
    
    render() {
        return(
            <>
                <td>
                    {this.state.num}
                </td>
                <td>
                    <Form>
                        <Form.Control 
                            as="select"
                            value={this.state.projectType} 
                            onChange={(event) => this.setState({
                                projectType: event.target.value
                            })}>
                            <option value="">(none)</option>
                            <option value="P">(P) Project</option>
                            <option value="S">(S) Stability</option>
                            <option value="I">(I) Investigation</option>
                            <option value="R">(I) Release</option>
                            <option value="SQ">(SQ) Standard Qualification</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>
                    <Form>
                        <Form.Control 
                            type="text"
                            placeholder="Title" 
                            value={this.state.title} 
                            onChange={(event) => this.setState({
                                title: event.target.value
                            })}
                        >
                        </Form.Control>
                    </Form>
                    
                </td>
                <td>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="6"> Physical/Spectroscopic </td>
                                </tr>
                                <tr>

                                    <td>
                                        <input type="checkbox" value="colorAndAppearance" checked={this.state.tests.colorAndAppearance} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Color & Appearance</td>
                                    <td>
                                        <input type="checkbox" value="lod" checked={this.state.tests.lod} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>LOD</td>
                                    <td>
                                        <input type="checkbox" value="ash" checked={this.state.tests.ash} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Ash</td>
                                    
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <input type="checkbox" value="particleSize" checked={this.state.tests.particleSize} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Particle Sz.</td>

                                
                                    <td>
                                        <input type="checkbox" value="solids" checked={this.state.tests.solids} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Solids</td>
                                    
                                    
                                    <td>
                                        <input type="checkbox" value="odor" checked={this.state.tests.odor} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Odor</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" value="meltingPoint" checked={this.state.tests.meltingPoint} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Melting Pt.</td>
                                    <td>
                                        <input type="checkbox" value="ftir" checked={this.state.tests.ftir} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>FTIR</td>
                                    <td>
                                        <input type="checkbox" value="nmr" checked={this.state.tests.nmr} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>NMR</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Chromatographic </td>
                                </tr>
                                <tr>

                                    <td>
                                        <input type="checkbox" value="hplc" checked={this.state.tests.hplc} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>HPLC</td>
                                    <td>
                                        <input type="checkbox" value="gcms" checked={this.state.tests.gcms} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>GCMS</td>
                                    <td>
                                        <input type="checkbox" value="hptlc" checked={this.state.tests.hptlc} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>HPTLC</td>
                                    <td>
                                        <input type="checkbox" value="sec" checked={this.state.tests.sec} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>SEC</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Microbial </td>
                                </tr>
                                <tr>

                                    <td>
                                        <input type="checkbox" value="totalPlateCount" checked={this.state.tests.totalPlateCount} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>TPC</td>
                                    <td>
                                        <input type="checkbox" value="coliform" checked={this.state.tests.coliform} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Coliform</td>
                                    <td>
                                        <input type="checkbox" value="yeastAndMold" checked={this.state.tests.yeastAndMold} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Y&M</td>
                                    <td>
                                        <input type="checkbox" value="eColi" checked={this.state.tests.eColi} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>E.Coli</td>
                                    
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" value="salmonella" checked={this.state.tests.salmonella} onChange={this.handleTestsOnCheck}/>
                                    </td >
                                    <td colSpan={"7"} >Salmonella</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Heavy Metals </td>
                                    <td colSpan="2"> Other </td>
                                </tr>
                                <tr>

                                    <td>
                                        <input type="checkbox" value="arsenic" checked={this.state.tests.arsenic} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>As</td>
                                    <td>
                                        <input type="checkbox" value="lead" checked={this.state.tests.lead} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Pb</td>
                                    <td>
                                        <input type="checkbox" value="mercury" checked={this.state.tests.mercury} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Hg</td>
                                    <td>
                                        <input type="checkbox" value="cadmium" checked={this.state.tests.cadmium} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>Cd</td>
                                    <td>
                                        <input type="checkbox" value="uvVis" checked={this.state.tests.uvVis} onChange={this.handleTestsOnCheck}/>
                                    </td>
                                    <td>uvVis</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </td>
                <td>
                    Lot Numbers:
                    <InputGroup >
                        <FormControl
                            type="text"
                            value={this.state.currLotNum} 
                            placeholder="New Lot" 
                            onChange={(event) => {
                                this.setState({
                                    currLotNum: event.target.value
                                })
                            }}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" onClick={this.handleAddNewLot} >+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    
                    {this.state.lotNums.map((lot, idx) => (
                        <InputGroup className="mb-3" key={idx}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                {lot}
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <InputGroup.Append>
                                <Button variant="outline-danger" onClick={this.handleDeleteLot}  value={"lot"}>-</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        )
                    )}
                    
                        
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

                    <Form>
                        <Form.Control 
                            as="select"
                            value={this.state.requester} 
                            onChange={(event) => this.setState({
                                requester: event.target.value
                            })}>
                            <option value="">none</option>
                            <option value="QC">QC</option>
                            <option value="NP">NP</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form>
                </td>

                <td>
                    <Form>
                        <Form.Control 
                            as="select"
                            value={this.state.analyst} 
                            onChange={(event) => this.setState({
                                analyst: event.target.value
                            })}>
                            <option value="">none</option>
                            <option value="MD">MD</option>
                            <option value="KH">KH</option>
                            <option value="WM">WM</option>
                        </Form.Control>
                    </Form>
                </td>
                    
                <td style={{textAlign:"center"}}>
                    <Button variant="primary" onClick={this.handleSubmitNewFile}> Add File</Button>
                </td>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentAvailableQCFile: state.currentAvailableQCFile,
        currentQCFiles: state.currentQCFiles,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQCFile: (qcFile) => dispatch({type: "ADD_NEW_QC_FILE", payload: qcFile}),
        setCurrentAvailableQCFile: (number) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: number}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(QCRecordForm)