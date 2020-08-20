import React from 'react'
import {Modal, Button, Row, Col, Toast, Container} from 'react-bootstrap'
import '../styles/toast-width.css'
import {EditorState, Editor,convertFromRaw, convertToRaw} from 'draft-js'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
// import { PencilSquare } from 'react-bootstrap-icons'

import PullSchedule from '../misc-components/pullSchedule'

class StabilityEntryModal extends React.Component {
    constructor(props) {
        super(props)
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP, pullDates, notes, year } = this.props.protocol
        this.state = {
            confirmUpdateOpen: false,
            confirmDeleteOpen: false,
            confirmCloseModalOpen: false,
            changeDetected: false,
            stabilityProtocolNum,
            products,
            lotNums,
            specs,
            condition,
            packaging,
            amountUnit,
            amountPerTimePt,
            dateStarted,
            amountPerSTP,
            pullDates,
            notes,
            year,
            currLotNum: "",
            editorState: null
        }
    }

    // close modal
    onCloseModal = () => {
        if (this.state.changeDetected) {
            this.setState({
                confirmCloseModalOpen: !this.state.confirmCloseModalOpen
            })
        } else {
            this.props.onHide()
        }
    }

    setUpdateConfirmation = () => {
        this.setState({
            confirmUpdateOpen: !this.state.confirmUpdateOpen
        })
    }

    setDeleteConfirmation = () => {
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
    }

    onClickUpdate = (event) => {
        // this will ultimately update the db
        // on submit, update db, update state, 
        if (event.target.value === "yes") {
            const bodyPreSend = {
                ...this.state, 
                lotNums: [...this.state.lotNums],
                products: [...this.state.products],
                specs: [this.state.specs],
                amountPerSTP: [...this.state.amountPerSTP],
                pullDates: {...this.state.pullDates},
                notes: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
            }
            delete bodyPreSend.confirmUpdateOpen
            delete bodyPreSend.confirmDeleteOpen
            delete bodyPreSend.confirmCloseModalOpen
            delete bodyPreSend.changeDetected
            delete bodyPreSend.savedChanges
            delete bodyPreSend.editorState
            delete bodyPreSend.currLotNum

            const params = {
                headers:{},
                response: true,
                queryStringParameters: {},
                body: bodyPreSend
            }
            
            this.props.currentlyFetching()
            API.put("stabilityAPI", "/stability", params)
                .then(response => {
                    this.props.fetchSuccess()
                    return JSON.parse(response.config.data)
                })
                .then(data => {
                    // take target QC Number
                    const targetNum = data.stabilityProtocolNum
                    const remainingStabilityProtocols = this.props.currentStabilityProtocols.filter(protocol => protocol.stabilityProtocolNum !== targetNum)
                    remainingStabilityProtocols.push(data)
                    remainingStabilityProtocols.sort((a, b) => a.stabilityProtocolNum - b.stabilityProtocolNum)
                    this.props.updateQCFiles(remainingStabilityProtocols)
                })
                .catch(error => {
                    this.props.fetchFail()
                    console.log({error})
                })

            this.setState({
                confirmUpdateOpen: !this.state.confirmUpdateOpen,
                changeDetected: false
            })
        } else {
            this.setState({
                confirmUpdateOpen: !this.state.confirmUpdateOpen
            })
        }
        
    }


    onClickCloseModal = (event) => {
        // confirms whether to save to db or discard state changes...
        if (event.target.value === "yes") {
            this.setState({
                changeDetected: false,
                savedChanges: false,
                ...this.props.protocol,
                lotNums: [...this.props.protocol.lotNums],
                products: [...this.props.protocol.products],
                specs: [this.props.protocol.specs],
                amountPerSTP: [...this.props.protocol.amountPerSTP],
                pullDates: {...this.props.protocol.pullDates},
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.notes)))
            }, () => {
                // closes the modal and resets the state
                this.setState({
                    confirmCloseModalOpen: !this.state.confirmCloseModalOpen
                })
                this.props.onHide()
            })
        } else {
            this.setState({
                confirmCloseModalOpen: !this.state.confirmCloseModalOpen
            })
        }
       
    }

    handleNoteBookInfoChange = (editorState) => {
        this.setState({
            changeDetected: true,
            editorState
        })
    }

    handlePullDateChange = (date) => {
        const pullDatesCopy = {...this.state.pullDates}
        pullDatesCopy[date] = !pullDatesCopy[date]
        this.setState({
            ...this.state,
            changeDetected: true,
            pullDates: pullDatesCopy
        })
    }

    componentDidMount = () => {
        if (this.state.notes === "") {
            this.setState({
                editorState: EditorState.createEmpty()
            })
        } else {
            // recreate editor state from stringified version
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.notes)))
            })
        }
    }

    render() {
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP, pullDates, year } = this.state
        
        const { currentQCFiles, fetchStatus, updateQCFiles, currentlyFetching, fetchSuccess, fetchFail, setCurrentAvailableQCFile, ...rest} = this.props
        return (
            <Modal
                {...rest}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={'static'}
                centered
                hidden={this.props.fetchStatus}    
            >
                <Modal.Header >
                    <Container fluid>
                        <Row>
                            <Modal.Title id="contained-modal-title-vcenter">
                                SP-{year.substring(2,4)}-{stabilityProtocolNum.substring(2,4)}
                            </Modal.Title>
                        </Row>
                        <Row>
                            <Col>
                                <strong> Condition: </strong> {condition}
                            </Col>
                            <Col>
                                <strong> Packaging: </strong> {packaging}
                            </Col>
                            <Col>
                                <strong> Date Started: </strong> {dateStarted}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong> Lot:  </strong> {lotNums.join(", ")}
                            </Col>
                            <Col>
                                <strong> Products: </strong> {products.join(", ")}
                            </Col>
                            <Col>
                                <strong> Specs: </strong> {specs.join(", ")}
                            </Col>
                            <Col>
                                <strong> STPs: </strong> {amountPerSTP.join(", ")}
                            </Col>
                        </Row>
                        {/* <Accordion>
                            <Accordion.Toggle
                                size={12}
                                as={PencilSquare}
                                variant="link"
                                eventKey="0"
                                style={{ cursor: "pointer" }}>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div> Edit Under Construction. </div>
                                <EditLayoutForm
                                    projectType={projectType}
                                    lotNums={lotNums}
                                    title={title}
                                    requester={requester}
                                    analyst={analyst}
                                    nbPage={nbPage}
                                    dateIn={dateIn}
                                    dateOut={dateOut}
                                    currLotNum={currLotNum}
                                    handleProjectInfoChange={this.handleProjectInfoChange}
                                    handleProjectTextChange={this.handleProjectTextChange}
                                    handleAddNewLot={this.handleAddNewLot}
                                    handleDeleteLot={this.handleDeleteLot}
                                    handleDateInChange={this.handleDateInChange}
                                    handleDateOutChange={this.handleDateOutChange}
                                />
                            </Accordion.Collapse>
                        </Accordion> */}
                    </Container>
                </Modal.Header>
                <Modal.Body>    
                    <Container fluid>
                        <Row>
                            <Col>
                                <PullSchedule 
                                    pullDates={pullDates}
                                    amountPerTimePt={amountPerTimePt}
                                    condition={condition}
                                    amountUnit={amountUnit}
                                    handlePullDateChange={this.handlePullDateChange}/>
                            </Col>
                            <Col>
                                <Toast className="toast-top-full-width">
                                    <Toast.Header closeButton={false}>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">Notes:</strong>
                                    </Toast.Header>
                                    <Toast.Body>
                                        <Editor
                                            editorState={this.state.editorState}
                                            onChange={this.handleNoteBookInfoChange}
                                            placeholder="Add notes here..."
                                        />

                                    </Toast.Body>
                                </Toast>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer hidden={this.state.confirmUpdateOpen || this.state.confirmDeleteOpen || this.state.confirmCloseModalOpen}>
                    <Button variant="info" onClick={this.setUpdateConfirmation} disabled={!this.state.changeDetected}>Save</Button>
                    <Button variant="danger" onClick={this.setDeleteConfirmation}>Delete</Button>
                    <Button onClick={this.onCloseModal}>Close</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmUpdateOpen}>
                    Are you sure you want to save updates to this Protocol?
                    <Button variant="outline-success" onClick={this.onClickUpdate} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickUpdate} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmDeleteOpen}>
                    You want to delete this Protocol? This action cannot be undone, are you sure?
                    <Button variant="outline-danger" onClick={this.onClickDelete} value="yes">Yes</Button>
                    <Button variant="outline-success" onClick={this.onClickDelete} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmCloseModalOpen}>
                    Are you sure you want to exit without saving? The changes will be lost otherwise.
                    <Button variant="outline-danger" onClick={this.onClickCloseModal} value="yes">Yes</Button>
                    <Button variant="outline-success" onClick={this.onClickCloseModal} value="no">No</Button>
                </Modal.Footer>

            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        currentYear: state.currentYear,
        fetchStatus: state.fetchStatus,
        currentStabilityProtocols: state.currentStabilityProtocols
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStabilityProtocol: (protocol) => dispatch({ type: "UPDATE_STABILITY_PROTOCOL", payload: protocol}),
        setCurrentAvailableStabilityProtocol: (protocolNum) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocolNum }),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StabilityEntryModal)