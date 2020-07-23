import React from 'react'
import {Modal, Button, Row, Col, Container} from 'react-bootstrap'
import {connect} from 'react-redux'
import {API} from 'aws-amplify'
import TestSelection from '../components/testSelection'

class QCEntryModal extends React.Component {
    constructor(props) {
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage} = props.file
        super(props)
        this.state = {
            confirmUpdateOpen: false,
            confirmDeleteOpen: false,
            confirmCloseModalOpen: false,
            changeDetected: false,
            num,
            projectType,
            title,
            tests,
            lotNums,
            dateIn,
            dateOut,
            requester,
            analyst,
            notes,
            nbPage
        }
    }

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

    onClickCloseModal = (event) => {
        // confirms whether to save to db or discard state changes...
        if (event.target.value === "yes") {
            this.setState({
                changeDetected: false,
                savedChanges: false,
                ...this.props.file
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

    onClickUpdate = (event) => {
        // this will ultimately update the db
        // on submit, update db, update state, 
        if (event.target.value === "yes") {
            const bodyPreSend = {...this.state, tests:{...this.state.tests}}
            delete bodyPreSend.confirmUpdateOpen
            delete bodyPreSend.confirmDeleteOpen
            delete bodyPreSend.confirmCloseModalOpen
            delete bodyPreSend.changeDetected
            delete bodyPreSend.savedChanges

            const params = {
                headers:{},
                response: true,
                queryStringParameters: {},
                body: bodyPreSend
            }
            
            this.props.currentlyFetching()
            API.put("qcfilesAPI", "/qcfiles", params)
                .then(response => {
                    this.props.fetchSuccess()
                    return JSON.parse(response.config.data)
                })
                .then(data => {
                    // take target QC Number
                    const targetNum = data.num
                    const remainingQCFiles = this.props.currentQCFiles.filter(file => file.num !== targetNum)
                    remainingQCFiles.push(data)
                    remainingQCFiles.sort((a, b) => a.num - b.num)
                    this.props.updateQCFiles(remainingQCFiles)
                })
                .catch(error => {
                    this.props.fetchFail()
                    console.log(error)
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

    onClickDelete = (event) => {
        console.log(event.target.value)
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
        // const params = {
            //         headers:{},
            //         response: true,
            //         queryStringParameters: {},
            //         body: {}
            //     }
        
            //     API.del("qcfilesAPI", "/qcfiles/20002", params)
            //         .then(response => {
            //             console.log(response)
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         })
    }

    handleTestsOnCheck = (event) => {
        this.setState({
            ...this.state,
            changeDetected: true,
            tests: {
                ...this.state.tests,
                [event.target.value]: !this.state.tests[event.target.value] 
            }
        })
    }

    render() {
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage} = this.state
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={'static'}
                centered
            >
                <Modal.Header >
                    <Container fluid>
                        <Row>
                            <Modal.Title id="contained-modal-title-vcenter">
                                QC{num} - ({projectType}) - {title}
                            </Modal.Title>
                        </Row>
                        <Row>
                            <Col>
                                <h6>{lotNums.join(", ")}</h6>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Edit Title, Project Type Here...
                            </Col>

                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                Date in: {dateIn}
                            </Col>
                            <Col>
                                Date out: {dateOut}
                            </Col>
                            <Col>
                                Requested By: {requester}
                            </Col>
                            <Col>
                                Main Analyst: {analyst}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                               <TestSelection 
                                    tests={tests}
                                    handleTestsOnCheck={this.handleTestsOnCheck}
                                    uniqueID={"modal"}
                               />
                            </Col>
                            <Col>
                                <p>Notes: {notes}</p>
                                <p>NoteBook Pages:{nbPage}</p>
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
                    Are you sure you want to save updates to this QC File?
                    <Button variant="outline-success" onClick={this.onClickUpdate} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickUpdate} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmDeleteOpen}>
                    Are you sure you want to delete this QC File?
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
        currentQCFiles: state.currentQCFiles,
        fetchStatus: state.fetchStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateQCFiles: (newFiles) => dispatch({type: "UPDATE_QC_FILES", payload: newFiles}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCEntryModal)