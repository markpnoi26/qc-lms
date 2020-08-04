import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
import {Button, Form, InputGroup, FormControl, Row, Col, Container, Badge} from 'react-bootstrap'


export default class StabilityForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            protocolNum: "",
            products: [],
            lotNums: [],
            specs: [],
            condition: "",
            packaging: "",
            dateStarted: "",
            amountPerSTP: [],
            stp: "",
            amount: "",
            currProduct: "",
            currLotNum: ""
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

    render() {
        return (
            <>
                <td>
                    <InputGroup >
                        <FormControl
                            type="text"
                            size="sm"
                            value={this.state.protocolNum}
                            placeholder="Assign Protocol"
                            onChange={(event) => {
                                this.setState({
                                    protocolNum: event.target.value
                                })
                            }}>

                        </FormControl>
                    </InputGroup>
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
                <td>Spec #</td>
                <td>STPs</td>
                <td>Condition</td>
                <td>Packaging</td>
                <td>Amount/Time Point</td>
                <td>Amount Unit</td>
                <td>Date Started</td>
                <td>Action</td>
            </>
        )
    }


}