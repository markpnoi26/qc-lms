import React from 'react'
import {Modal, Button, Row, Col, Toast, Container} from 'react-bootstrap'
import '../styles/toast-width.css'
// import { PencilSquare } from 'react-bootstrap-icons'

import PullSchedule from '../misc-components/pullSchedule'

export default class StabilityEntryModal extends React.Component {
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
                                SP-{year.substring(2,4)}-{stabilityProtocolNum}
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
                                    amountUnit={amountUnit}/>
                            </Col>
                            <Col>
                                <Toast className="toast-top-full-width">
                                    <Toast.Header closeButton={false}>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">Notes:</strong>
                                    </Toast.Header>
                                    <Toast.Body>
                                        {/* <Editor
                                            editorState={this.state.editorState}
                                            onChange={this.handleNoteBookInfoChange}
                                            placeholder="Add notes here..."
                                        /> */}

                                    </Toast.Body>
                                </Toast>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}