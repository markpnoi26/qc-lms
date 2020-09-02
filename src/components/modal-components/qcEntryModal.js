import React from 'react'
import {Modal, Button, Row, Col, Container, Accordion, Toast} from 'react-bootstrap'
import {PencilSquare} from 'react-bootstrap-icons'
import {connect} from 'react-redux'
import {API} from 'aws-amplify'
import {EditorState, Editor,convertFromRaw, convertToRaw} from 'draft-js'
import TestSelection from '../misc-components/testSelection'
import EditQCForm from '../form-components/editQCForm'
import 'draft-js/dist/Draft.css'
import '../styles/toast-width.css'

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
            nbPage,
            currLotNum: "",
            editorState: null
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
                ...this.props.file,
                lotNums: [...this.props.file.lotNums],
                tests: {...this.props.file.tests},
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

    onClickUpdate = (event) => {
        // this will ultimately update the db
        // on submit, update db, update state, 
        if (event.target.value === "yes") {
            const bodyPreSend = {
                ...this.state, 
                tests: {...this.state.tests}, 
                lotNums: [...this.state.lotNums],
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
        // if the user clicks yes, 
        // delete the file, update the state, and close the modal completely.
        if (event.target.value === "yes") {
            // delete the file in db
            // update the state of the application to delete the file in the state
            const params = {
                headers:{},
                response: true,
                queryStringParameters: {},
                body: {}
            }

            this.props.currentlyFetching()
            API.del("qcfilesAPI", `/qcfiles/${this.state.num}`, params)
                .then(response => {
                    this.props.fetchSuccess()
                    let targetURL = response.data.url
                    let qcNum = targetURL.split("/")[2]
                    return qcNum
                })
                .then(num => {
                    const remainingQCFiles = this.props.currentQCFiles.filter(file => file.num !== num)
                    this.props.updateQCFiles(remainingQCFiles)

                    
                    const start = this.props.currentYear.substring(2, 4) + "001"
                    let startQCFile = parseInt(start, 10)
                    for (let i = 0; i < remainingQCFiles.length; i++) {
                        const stringedFileNum = JSON.stringify(startQCFile)
                        if (remainingQCFiles[i].num !== stringedFileNum) {
                            this.props.setCurrentAvailableQCFile(stringedFileNum)
                            return stringedFileNum
                        }
                        startQCFile++
                    }
                    this.props.setCurrentAvailableQCFile(JSON.stringify(startQCFile))
                    this.props.setAvailableQCFile(num)
                })
                .catch(error => {
                    this.props.fetchFail()
                    console.log(error)
                })
            this.setState({
                confirmCloseModalOpen: this.state.confirmCloseModalOpen,
                changeDetected: false
            }, () => {
                this.props.onHide()
            })
        } else {
            this.setState({
                confirmDeleteOpen: !this.state.confirmDeleteOpen
            })
        }
    
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

    handleNoteBookInfoChange = (editorState) => {
        this.setState({
            changeDetected: true,
            editorState
        })
    }

    handleProjectInfoChange = (event) => {
        // only these labels are handled by this callback
        // projectType
        // title
        // dateIn
        // dateOut
        // requester
        // analyst
        // nbPage
        // console.dir(event.target.attributes.label.nodeValue)
        const targetLabel = event.target.attributes.label.nodeValue
        const targetValue = event.target.value

        this.setState({
            ...this.state,
            changeDetected: true,
            [targetLabel]: targetValue
        })

    }

    handleProjectTextChange = (event) => {
        const targetLabel = event.target.attributes.label.nodeValue
        const targetValue = event.target.value
        this.setState({
            ...this.state,
            changeDetected: true,
            [targetLabel]: targetValue
        })
    }

    handleDateInChange = (date) => {
        this.setState({
            ...this.state,
            changeDetected: true,
            dateIn: date
        })
    }

    handleDateOutChange = (date) => {
        this.setState({
            ...this.state,
            changeDetected: true,
            dateOut: date
        })
    }

    handleAddNewLot = (event) => {
        if (this.state.currLotNum === "") return
        const currLot = this.state.currLotNum
        const newLotCollection = this.state.lotNums
        newLotCollection.push(currLot)
        this.setState({
            ...this.state,
            changeDetected: true,
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
            ...this.state,
            changeDetected: true,
            lotNums: newLotCollection
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
        // spread operator to keep code DRY
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, nbPage, currLotNum} = this.state
        // below prevents certain props related to the parent to stay as parent props only.
        const { currentQCFiles, fetchStatus, updateQCFiles, currentlyFetching, fetchSuccess, fetchFail, setCurrentAvailableQCFile, currentYear, ...rest} = this.props
        return(
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
                                QC{num} - ({projectType}) - {title} {" "}
                            </Modal.Title>
                        </Row>
                        <Row>
                            <Col>
                                <strong> Requested By: </strong> {requester}
                            </Col>
                            <Col>
                                <strong> Main Analyst: </strong> {analyst}
                            </Col>
                            <Col>
                                <strong> Date in: </strong> {dateIn}
                            </Col>
                            <Col>
                                <strong> Date out: </strong> {dateOut}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong> Lot:  </strong> {lotNums.join(", ")}
                            </Col>
                            <Col>
                                <strong> Note Book Pages: </strong> {nbPage}
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
                                <EditQCForm
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
                    Are you sure you want to save updates to this QC File?
                    <Button variant="outline-success" onClick={this.onClickUpdate} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickUpdate} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmDeleteOpen}>
                    You want to delete this QC File? This action cannot be undone, are you sure?
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
        fetchStatus: state.fetchStatus,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateQCFiles: (newFiles) => dispatch({type: "UPDATE_QC_FILES", payload: newFiles}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"}),
        setCurrentAvailableQCFile: (qcFile) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: qcFile})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QCEntryModal)