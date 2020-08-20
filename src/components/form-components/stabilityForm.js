import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {Button, Form, InputGroup, FormControl, Row, Col, Container, Badge} from 'react-bootstrap'
import {EditorState, convertToRaw} from 'draft-js'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import '../styles/date-picker.css'


class StabilityForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stabilityProtocolNum: this.props.currentAvailableStabilityProtocol,
            products: [],
            lotNums: [],
            specs: [],
            condition: "25/60",
            conditionTimePts: 0,
            packaging: "",
            dateStarted: moment().format("L"),
            amountUnit: "g",
            amountPerSTP: [],
            amountPerTimePt: 0,
            stp: "",
            amount: 0,
            currProduct: "",
            currLotNum: "",
            currSpec: "",
            currDate: new Date(),
            notes: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
        }
    }

    handleNewProduct = (event) => {
        if (this.state.currProduct === "") return

        const currProduct = this.state.currProduct
        const newProductCollection = this.state.products
        newProductCollection.push(currProduct)
        this.setState({
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
            products: newLotCollection
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

    handleAddNewSpec = (event) => {

        if (this.state.currSpec === "") return

        const currSpec = this.state.currSpec
        const newSpecCollection = this.state.specs
        newSpecCollection.push(currSpec)
        this.setState({
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
            specs: newSpecsCollection
        })
    }

    handleAddNewSTP = (event) => {
        if (this.state.stp === "") return

        const currSTP = this.state.stp
        const currAmount = this.state.amount
        const newAmountPerSTP = this.state.amountPerSTP
        newAmountPerSTP.push({stp: currSTP, amount: currAmount})
        this.setState({
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
            amountPerSTP: newSTPCollection,
            amountPerTimePt: parseInt(this.state.amountPerTimePt) - parseInt(amountToTakeOut, 10)
        })
    }


    handleSubmitNewProtocol = () => {
        const months = {
            "40/75": [0, 1, 3, 6],
            "25/60": [0, 3, 6, 9, 12, 18, 24, 36, 48, 60]
        }

        // this is to add pull dates before submitting the entry item.
        const datePoints = months[this.state.condition]
        const dates = {}

        for (let i=0; i<datePoints.length; i++) {
            const dateStarted = new Date(this.state.dateStarted)
            const currDateToBeAdded = new Date(dateStarted.setMonth(dateStarted.getMonth() + datePoints[i]))
            dates[(moment(currDateToBeAdded).format("L"))] = i===0? true:false
        }

        const bodyPreSend = {
            ...this.state, 
            products: [...this.state.products],
            lotNums: [...this.state.lotNums],
            specs: [...this.state.specs],
            amountPerSTP: [...this.state.amountPerSTP],
            pullDates: dates,
            year: this.props.currentYear
        }

        delete bodyPreSend.currProduct
        delete bodyPreSend.currLotNum
        delete bodyPreSend.currSpec
        delete bodyPreSend.currDate

        if (bodyPreSend.stabilityProtocolNum === "") return alert("Please make sure protocol exists.")
        if (bodyPreSend.dateStarted === "") return alert("Please make sure you add a start date.")
        if (bodyPreSend.condition === "") return alert("Please make sure there is a condition indicated.")

        const params = {
            headers: {},
            response: true,
            queryStringParameters: {},
            body: bodyPreSend
        }

        API.post("stabilityAPI", "/stability", params)
            .then(response => {
                this.props.fetchSuccess()
                const data = JSON.parse(response.config.data)
                return data
            })
            .then((data) => {
                this.props.addStabilityProtocol(data)
            })
            .then(() => {
                const currentStabilityProtocols = this.props.currentStabilityProtocols
                let start = 1, stringedNum, stabilityProtocolNum 

                for (let i = 0; i < currentStabilityProtocols.length; i++) {
                    stringedNum = start <= 9 ? `0${start}` : `${start}`
                    stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                    if (currentStabilityProtocols[i].stabilityProtocolNum !== stabilityProtocolNum) {
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
                console.log({error})
                this.props.fetchFail()
            })

        this.setState({
            stabilityProtocolNum: this.props.currentAvailableStabilityProtocol,
            products: [],
            lotNums: [],
            specs: [],
            condition: "25/60",
            conditionTimePts: 0,
            packaging: "",
            dateStarted: "",
            amountUnit: "g",
            amountPerSTP: [],
            amountPerTimePt: 0,
            stp: "",
            amount: 0,
            currProduct: "",
            currLotNum: "",
            currSpec: "",
            currDate: new Date(),
            notes: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentAvailableStabilityProtocol !== prevState.stabilityProtocolNum) {
            return { stabilityProtocolNum: nextProps.currentAvailableStabilityProtocol };
        }
        return null;
    }

    render() {
        return (
            <>
                <td>
                    SP-{this.props.currentYear.substring(2, 4)}-{this.props.currentAvailableStabilityProtocol.substring(2,4)}
                </td>
                <td>
                    <InputGroup >
                        <FormControl
                            type="text"
                            size="sm"
                            value={this.state.currProduct} 
                            placeholder="New Product" 
                            onChange={(event) => {
                                this.setState({
                                    currProduct: event.target.value
                                })
                            }}
                        />
                        <InputGroup.Append>
                        <Button size="sm" variant="outline-primary" onClick={this.handleNewProduct} >+</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Container>
                        {this.state.products.map((product) => (
                            <Row key={uuidv4()} >
                                <Col>
                                    {product} 
                                </Col>
                                <Col value={product} >
                                    <Badge pill value={product} variant="danger" style={{ cursor: "pointer" }} onClick={this.handleDeleteProduct}>X</Badge>
                                </Col>
                            </Row>
                        ))
                        }
                    </Container>
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
                <td>
                    <InputGroup >
                        <FormControl
                            type="text"
                            size="sm"
                            value={this.state.currSpec} 
                            placeholder="Specification #" 
                            onChange={(event) => {
                                this.setState({
                                    currSpec: event.target.value
                                })
                            }}
                        />
                        <InputGroup.Append>
                        <Button size="sm" variant="outline-primary" onClick={this.handleAddNewSpec} >+</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Container>
                        {this.state.specs.map((spec) => (
                            <Row key={uuidv4()} >
                                <Col>
                                    {spec} 
                                </Col>
                                <Col value={spec} >
                                    <Badge pill value={spec} variant="danger" style={{ cursor: "pointer" }} onClick={this.handleDeleteSpec}>X</Badge>
                                </Col>
                            </Row>
                        ))
                        }
                    </Container></td>
                <td>
                    <Form>
                        <Form.Control 
                            as="select"
                            size="sm"
                            value={this.state.condition} 
                            onChange={(event) => {
                                let conditionTimePoint = 0
                                if (event.target.value === "40/75") {
                                    conditionTimePoint = 5
                                } else if (event.target.value === "25/60") {
                                    conditionTimePoint = 10
                                }
                                this.setState({
                                    condition: event.target.value,
                                    conditionTimePts: conditionTimePoint
                                })
                            }}>
                            <option value="25/60">25°C/60%RH</option>
                            <option value="40/75">40°C/75%RH</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>
                    <InputGroup >
                        <Form.Control
                            as="textarea"
                            row="6"
                            size="sm"
                            value={this.state.packaging}
                            placeholder="packaging description"
                            onChange={(event) => {
                                this.setState({
                                    packaging: event.target.value
                                })
                            }}>

                        </Form.Control>
                    </InputGroup>
                </td>
                <td>
                    <InputGroup >
                        <FormControl
                            type="text"
                            size="sm"
                            value={this.state.stp} 
                            placeholder="STP" 
                            onChange={(event) => {
                                this.setState({
                                    stp: event.target.value
                                })
                            }}
                        />
                         <FormControl
                            type="number"
                            size="sm"
                            value={this.state.amount} 
                            placeholder="Amount" 
                            onChange={(event) => {
                                this.setState({
                                    amount: event.target.value
                                })
                            }}
                        />
                        <InputGroup.Append>
                        <Button size="sm" variant="outline-primary" onClick={this.handleAddNewSTP} >+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Container>
                        {this.state.amountPerSTP.map((item, idx) => (
                            <Row key={uuidv4()} >
                                <Col>
                                    STP-{item.stp} 
                                </Col>
                                <Col>
                                    {item.amount} 
                                </Col>
                                <Col value={idx} >
                                    <Badge pill value={idx} variant="danger" style={{ cursor: "pointer" }} onClick={this.handleDeleteSTP}>X</Badge>
                                </Col>
                            </Row>
                        ))
                        }
                    </Container>
                </td>
                <td>{this.state.amountPerTimePt}</td>
                <td>
                    <Form>
                        <Form.Control 
                            as="select"
                            size="sm"
                            value={this.state.amountUnit} 
                            onChange={(event) => this.setState({
                                amountUnit: event.target.value
                            })}>
                            <option value="g">g</option>
                            <option value="mL">mL</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>
                    <DatePicker 
                        value={this.state.currDate}
                        className="date-picker"
                        onChange={(value) => {
                            const date = moment(value).format("L")
                            this.setState({
                                dateStarted: date,
                                currDate: value
                            })
                        }}
                    />
                </td>
                <td style={{textAlign:"center"}}>
                    <Button size="sm" variant="primary" onClick={this.handleSubmitNewProtocol}> Add </Button>
                </td>
            </>
        )
    }


}

const mapStateToProps = state => {
    return {
        currentYear: state.currentYear,
        fetchStatus: state.fetchStatus,
        currentStabilityProtocols: state.currentStabilityProtocols,
        currentAvailableStabilityProtocol: state.currentAvailableStabilityProtocol
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addStabilityProtocol: (protocol) => dispatch({ type: "ADD_NEW_STABILITY_PROTOCOL", payload: protocol}),
        setCurrentAvailableStabilityProtocol: (protocolNum) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocolNum }),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"})
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(StabilityForm)