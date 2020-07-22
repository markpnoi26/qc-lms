import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'

import {Button, Form, InputGroup, FormControl, Table} from 'react-bootstrap'

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
                uvVis: false,
                retain: false
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
                uvVis: false,
                retain: false
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

        const physSpecID = [
            ["colorAndAppearance", "lod", "ash"],
            ["particleSize", "solids", "odor"],
            ["meltingPoint", "ftir", "nmr"]
        ]

        const physSpecLabel = [
            ["Color & Appearance", "LOD", "Ash"],
            ["Particle Size", "Solids", "Odor"],
            ["Melting Pt.", "FTIR", "NMR"]
        ]

        const chromatographicID = [
            ["hplc", "gcms", "hptlc", "sec"]
        ]

        const chromatographicLabel = [
            ["HPLC", "GCMS", "HPTLC", "SEC"]
        ]

        const microbialID = [
            ["totalPlateCount", "coliform", "yeastAndMold"], 
            ["eColi", "salmonella"]
        ]

        const microbialLabel = [
            ["TPC", "Coliform", "Y&M"], 
            ["E.Coli", "Salmonella"]
        ]

        const heavyMetalsID = [
            ["arsenic", "lead", "mercury", "cadmium"]
        ]

        const heavyMetalsLabel = [
            ["As", "Pb", "Hg", "Cd"]
        ]

        const otherID = [
            ["uvVis", "retain"]
        ]

        const otherLabel = [
            ["UV/Vis", "Retain"]
        ]

        return(
            <>
                <td>
                    {this.state.num}
                </td>
                <td>
                    <Form>
                        <Form.Control 
                            as="select"
                            size="sm"
                            value={this.state.projectType} 
                            onChange={(event) => this.setState({
                                projectType: event.target.value
                            })}>
                            <option value="">Select Type</option>
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
                            size="sm"
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
                    <Form>
                        <Table size="sm" variant="dark">
                            <tbody>
                                <tr>
                                    <td colSpan="3"> Physical/Spectroscopic </td>
                                </tr>
                                {physSpecID.map((section, i) => {
                                    return (
                                        <tr> 
                                            {section.map((test, idx) => {
                                                return (
                                                    <td>
                                                        <Form.Check  
                                                            value={test}
                                                            type="switch"
                                                            label={physSpecLabel[i][idx]}
                                                            id={test}
                                                            checked={this.state.tests[test]} 
                                                            onChange={this.handleTestsOnCheck}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>
                    <Form>
                        <Table size="sm" variant="dark">
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Chromatographic </td>
                                </tr>
                                {chromatographicID.map((section, i) => {
                                    return (
                                        <tr> 
                                            {section.map((test, idx) => {
                                                return (
                                                    <td>
                                                        <Form.Check  
                                                            value={test}
                                                            type="switch"
                                                            label={chromatographicLabel[i][idx]}
                                                            id={test}
                                                            checked={this.state.tests[test]} 
                                                            onChange={this.handleTestsOnCheck}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>
                    <Form>
                        <Table size="sm" variant="dark">
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Microbial </td>
                                </tr>
                                {microbialID.map((section, i) => {
                                    return (
                                        <tr> 
                                            {section.map((test, idx) => {
                                                return (
                                                    <td>
                                                        <Form.Check  
                                                            value={test}
                                                            type="switch"
                                                            label={microbialLabel[i][idx]}
                                                            id={test}
                                                            checked={this.state.tests[test]} 
                                                            onChange={this.handleTestsOnCheck}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>
                    <Form>
                        <Table size="sm" variant="dark">
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Heavy Metals </td>
                                </tr>
                                {heavyMetalsID.map((section, i) => {
                                    return (
                                        <tr> 
                                            {section.map((test, idx) => {
                                                return (
                                                    <td>
                                                        <Form.Check  
                                                            value={test}
                                                            type="switch"
                                                            label={heavyMetalsLabel[i][idx]}
                                                            id={test}
                                                            checked={this.state.tests[test]} 
                                                            onChange={this.handleTestsOnCheck}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>
                    <Form>
                        <Table size="sm" variant="dark">
                            <tbody>
                                <tr>
                                    <td colSpan="8"> Other </td>
                                </tr>
                                {otherID.map((section, i) => {
                                    return (
                                        <tr> 
                                            {section.map((test, idx) => {
                                                return (
                                                    <td>
                                                        <Form.Check  
                                                            value={test}
                                                            type="switch"
                                                            label={otherLabel[i][idx]}
                                                            id={test}
                                                            checked={this.state.tests[test]} 
                                                            onChange={this.handleTestsOnCheck}
                                                        />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>
                </td>
                <td>
                    Lot Numbers:
                    <InputGroup >
                        <FormControl
                            type="text"
                            size="sm"
                            value={this.state.currLotNum} 
                            placeholder="New Lot" 
                            onChange={(event) => {
                                this.setState({
                                    currLotNum: event.target.value
                                })
                            }}
                        />
                        <InputGroup.Append>
                        <Button size="sm" variant="outline-primary" onClick={this.handleAddNewLot} >+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    
                    {this.state.lotNums.map((lot, idx) => (
                        <InputGroup className="mb-3" key={idx} size="sm">
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
                            size="sm"
                            value={this.state.requester} 
                            onChange={(event) => this.setState({
                                requester: event.target.value
                            })}>
                            <option value="">Select Requester</option>
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
                            size="sm"
                            value={this.state.analyst} 
                            onChange={(event) => this.setState({
                                analyst: event.target.value
                            })}>
                            <option value="">Select Analyst</option>
                            <option value="MD">MD</option>
                            <option value="KH">KH</option>
                            <option value="WM">WM</option>
                        </Form.Control>
                    </Form>
                </td>
                    
                <td style={{textAlign:"center"}}>
                    <Button size="sm" variant="primary" onClick={this.handleSubmitNewFile}> Add </Button>
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