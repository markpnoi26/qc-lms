import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
import {Button, Form, InputGroup, FormControl, Row, Col, Container, Badge} from 'react-bootstrap'
import {EditorState, convertToRaw} from 'draft-js'
import {v4 as uuidv4} from 'uuid'
import TestSelection from '../misc-components/testSelection'
import moment from 'moment'

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
            dateIn: moment().format("L"),
            dateOut: "",
            nbPage: "",
            notes: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
            currLotNum: ""
        }
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
        const lotValue = event.target.parentNode.attributes.value.value
        const idxOfTarget = this.state.lotNums.indexOf(lotValue)
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


        if (bodyPreSend.title === "" ) return alert("Please make sure title exists.")
        if (bodyPreSend.projectType === "" ) return alert("Please make sure you assign the project type.")

        const params = {
            headers:{},
            response: true,
            queryStringParameters: {},
            body: bodyPreSend
        }

        this.props.currentlyFetching()
        API.post("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.props.fetchSuccess()
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
            dateIn: moment().format("L"),
            dateOut: "",
            nbPage: "",
            notes: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
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
                            size="sm"
                            value={this.state.projectType} 
                            onChange={(event) => this.setState({
                                projectType: event.target.value
                            })}>
                            <option value="">Select Type</option>
                            <option value="P">(P) Project</option>
                            <option value="S">(S) Stability</option>
                            <option value="I">(I) Investigation</option>
                            <option value="R">(R) Release</option>
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
                <td style={{ textAlign: "left" }}>
                    <TestSelection 
                        tests={this.state.tests}
                        handleTestsOnCheck={this.handleTestsOnCheck}
                        uniqueID={"form"}
                    />
                </td>
                <td>
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

                    <Container>
                        {this.state.lotNums.map((lot) => (
                            <Row key={uuidv4()} >
                                <Col>
                                    {lot} 
                                </Col>
                                <Col value={lot} >
                                    <Badge pill value={lot} variant="danger" style={{ cursor: "pointer" }} onClick={this.handleDeleteLot}>X</Badge>
                                </Col>
                            </Row>
                        ))
                        }
                    </Container>
                    
                </td>
                <td style={{textAlign:"center"}}>
                    {this.state.lotNums.length}
                </td>
                <td>
                    {moment().format("L")}
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
        currentYear: state.currentYear,
        fetchStatus: state.fetchStatus
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