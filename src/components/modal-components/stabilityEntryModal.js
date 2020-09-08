import React from 'react'
import {Modal, Button, Row, Col, Toast, Container, Accordion} from 'react-bootstrap'
import '../styles/toast-width.css'
import {EditorState, Editor,convertFromRaw, convertToRaw} from 'draft-js'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
import { PencilSquare } from 'react-bootstrap-icons'

import moment from 'moment'
import EditStabilityForm from '../form-components/editStabilityForm'
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
            stp: "",
            amount: "",
            currProduct: "",
            currLotNum: "",
            currSpec: "",
            editorState: null,
            conditionChanged: false
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
            const months = {
                "40/75": [0, 1, 3, 6],
                "25/60": [0, 3, 6, 9, 12, 18, 24, 36, 48, 60]
            }
    
            // this is to add pull dates before submitting the entry item.
            const datePoints = months[this.state.condition]
            let dates = {}
    
            for (let i=0; i<datePoints.length; i++) {
                const dateStarted = new Date(this.state.dateStarted)
                const currDateToBeAdded = new Date(dateStarted.setMonth(dateStarted.getMonth() + datePoints[i]))
                dates[(moment(currDateToBeAdded).format("L"))] = i===0? true:false
            }

            if (!this.state.conditionChanged) {
                dates = this.state.pullDates
            }
            
            const bodyPreSend = {
                ...this.state, 
                lotNums: [...this.state.lotNums],
                products: [...this.state.products],
                specs: [this.state.specs],
                amountPerSTP: [...this.state.amountPerSTP],
                pullDates: dates,
                notes: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
            }
            delete bodyPreSend.confirmUpdateOpen
            delete bodyPreSend.confirmDeleteOpen
            delete bodyPreSend.confirmCloseModalOpen
            delete bodyPreSend.changeDetected
            delete bodyPreSend.savedChanges
            delete bodyPreSend.editorState
            delete bodyPreSend.currLotNum
            delete bodyPreSend.currProduct
            delete bodyPreSend.currSpec
            delete bodyPreSend.currDate
            delete bodyPreSend.stp
            delete bodyPreSend.amount

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
                    this.props.updateStabilityProtocols(remainingStabilityProtocols)
                })
                .catch(error => {
                    this.props.fetchFail()
                    console.log({error})
                })

            this.setState({
                confirmUpdateOpen: !this.state.confirmUpdateOpen,
                pullDates: dates,
                changeDetected: false,
                conditionChanged: false
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
            API.del("stabilityAPI", `/stability/${this.state.stabilityProtocolNum}`, params)
                .then(response => {
                    this.props.fetchSuccess()
                    let targetURL = response.data.url
                    let stabilityProtocolNum = targetURL.split("/")[2]
                    return stabilityProtocolNum
                })
                .then(num => {
                    const remainingStabilityProtocols = this.props.currentStabilityProtocols.filter(protocol => protocol.stabilityProtocolNum !== num)
                    this.props.updateStabilityProtocols(remainingStabilityProtocols)

                    let start = 1, stringedNum, stabilityProtocolNum

                    for (let i = 0; i < remainingStabilityProtocols.length; i++) {
                        stringedNum = start <= 9 ? `0${start}` : `${start}`
                        stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                        if (remainingStabilityProtocols[i].stabilityProtocolNum !== stabilityProtocolNum) {
                            this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
                            return stabilityProtocolNum
                        }
                        start++
                    }
                    stringedNum = start <= 9 ? `0${start}` : `${start}`
                    stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                    this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
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

    handleNewProduct = (event) => {
        if (this.state.currProduct === "") return

        const currProduct = this.state.currProduct
        const newProductCollection = this.state.products
        newProductCollection.push(currProduct)
        this.setState({
            ...this.state,
            changeDetected: true,
            products: newProductCollection,
            currProduct: ""
        })
    }

    handleDeleteProduct = (event) => {
        const product = event.target.parentNode.attributes.value.value
        const idxOfTarget = this.state.products.indexOf(product)
        const newLotCollection = this.state.products
        newLotCollection.splice(idxOfTarget, 1)
        this.setState({
            ...this.state,
            changeDetected: true,
            products: newLotCollection
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

    handleAddNewSpec = (event) => {

        if (this.state.currSpec === "") return

        const currSpec = this.state.currSpec
        const newSpecCollection = this.state.specs
        newSpecCollection.push(currSpec)
        this.setState({
            ...this.state,
            changeDetected: true,
            specs: newSpecCollection,
            currSpec: ""
        })
    }

    handleDeleteSpec = (event) => {
        const specValue = event.target.parentNode.attributes.value.value
        const idxOfTarget = this.state.specs.indexOf(specValue)
        const newSpecsCollection = this.state.specs
        newSpecsCollection.splice(idxOfTarget, 1)
        this.setState({
            ...this.state,
            changeDetected: true,
            specs: newSpecsCollection
        })
    }

    handleAddNewSTP = (event) => {
        if (this.state.stp === "") return

        const currSTP = this.state.stp
        const currAmount = this.state.amount
        const newAmountPerSTP = this.state.amountPerSTP
        newAmountPerSTP.push({ stp: currSTP, amount: currAmount })
        this.setState({
            ...this.state,
            changeDetected: true,
            amountPerSTP: newAmountPerSTP,
            stp: "",
            amount: 0,
            amountPerTimePt: parseInt(this.state.amountPerTimePt, 10) + parseInt(currAmount, 10)
        })
    }

    handleDeleteSTP = (event) => {
        const idxOfTarget = event.target.parentNode.attributes.value.value
        const newSTPCollection = this.state.amountPerSTP
        const amountToTakeOut = newSTPCollection[idxOfTarget].amount
        newSTPCollection.splice(idxOfTarget, 1)
        this.setState({
            ...this.state,
            changeDetected: true,
            amountPerSTP: newSTPCollection,
            amountPerTimePt: parseInt(this.state.amountPerTimePt) - parseInt(amountToTakeOut, 10)
        })
    }

    handleConditionChange = (event) => {
        let conditionTimePoint = 0
        if (event.target.value === "40/75") {
            conditionTimePoint = 5
        } else if (event.target.value === "25/60") {
            conditionTimePoint = 10
        }
        this.setState({
            changeDetected: true,
            conditionChanged: true,
            condition: event.target.value,
            conditionTimePts: conditionTimePoint
        })
    }

    handlePackagingChange = (event) => {
        this.setState({
            changeDetected: true,
            packaging: event.target.value
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

    handleDateStartedChange = (date) => {
        this.setState({
            ...this.state,
            conditionChanged: true,
            changeDetected: true,
            dateStarted: date
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
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP, pullDates, year, currLotNum, currProduct, currSpec, stp, amount} = this.state
        
        const { currentStabilityProtocols, fetchStatus, updateStabilityProtocols, currentlyFetching, fetchSuccess, fetchFail, setCurrentAvailableStabilityProtocol, currentYear, ...rest} = this.props
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
                                <strong> Condition: </strong> {condition} (°C/%RH)
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
                                <strong> Products: </strong> {products.join(", ")}
                            </Col>
                            <Col>
                                <strong> Lot:  </strong> {lotNums.join(", ")}
                            </Col>
                            <Col>
                                <strong> Specs: </strong> {specs.join(", ")}
                            </Col>
                        </Row>
                        <Accordion>
                            <Accordion.Toggle
                                size={12}
                                as={PencilSquare}
                                variant="link"
                                eventKey="0"
                                style={{ cursor: "pointer" }}>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <EditStabilityForm
                                    stabilityProtocolNum={stabilityProtocolNum}
                                    products={products}
                                    lotNums={lotNums}
                                    specs={specs}
                                    condition={condition}
                                    packaging={packaging}
                                    amountUnit={amountUnit}
                                    amountPerTimePt={amountPerTimePt}
                                    dateStarted={dateStarted}
                                    stp={stp}
                                    amount={amount}
                                    amountPerSTP={amountPerSTP}

                                    currLotNum={currLotNum}
                                    currProduct={currProduct}
                                    currSpec={currSpec}
                                    
                                    handleDateStartedChange={this.handleDateStartedChange}
                                    handleProjectTextChange={this.handleProjectTextChange}
                                    handleConditionChange={this.handleConditionChange}
                                    handlePackagingChange={this.handlePackagingChange}
                                    handleNewProduct={this.handleNewProduct}
                                    handleDeleteProduct={this.handleDeleteProduct}
                                    handleAddNewLot={this.handleAddNewLot}
                                    handleDeleteLot={this.handleDeleteLot}
                                    handleAddNewSpec={this.handleAddNewSpec}
                                    handleDeleteSpec={this.handleDeleteSpec}
                                    handleAddNewSTP={this.handleAddNewSTP}
                                    handleDeleteSTP={this.handleDeleteSTP}
                                />
                            </Accordion.Collapse>
                        </Accordion>
                    </Container>
                </Modal.Header>
                <Modal.Body>    
                    <Container fluid>
                        <Row>
                            <Col>
                                <PullSchedule 
                                    pullDates={pullDates}
                                    amountPerTimePt={amountPerTimePt}
                                    amountPerSTP={amountPerSTP}
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
        updateStabilityProtocols: (protocol) => dispatch({ type: "UPDATE_STABILITY_PROTOCOLS", payload: protocol}),
        setCurrentAvailableStabilityProtocol: (protocolNum) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocolNum }),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StabilityEntryModal)