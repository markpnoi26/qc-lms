import React from 'react'
import { Form, Row, Col, Container, InputGroup, FormControl, Button, Badge } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import '../styles/date-picker.css'


export default class EditStabilityForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateStarted: props.dateStarted !== "" ? moment(props.dateStarted, "MM/DD/YYYY").toDate(): null
        }
    }

    render() {
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP, currLotNum, currProduct, currSpec, handleNewProduct, handleDeleteProduct, handleAddNewLot, handleDeleteLot, handleAddNewSpec, handleDeleteSpec, handleAddNewSTP, handleDeleteSTP, handleConditionChange, handlePackagingChange, handleProjectTextChange } = this.props
        return (
            <Container>
                <Row>
                    <Col>
                        <strong>Condition: </strong>
                        <Form>
                            <Form.Control 
                                as="select"
                                size="sm"
                                value={condition} 
                                onChange={(event) => {
                                    handleConditionChange(event)
                                }}>
                                <option value="25/60">25°C/60%RH</option>
                                <option value="40/75">40°C/75%RH</option>
                            </Form.Control>
                        </Form>
                    </Col>
                    <Col>
                        <strong>Packaging: </strong>
                        <InputGroup >
                            <Form.Control
                                as="textarea"
                                row="6"
                                size="sm"
                                value={packaging}
                                placeholder="packaging description"
                                onChange={(event) => {
                                    handlePackagingChange(event)
                                }}>
                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col>
                        <strong>Date Started: </strong>
                        <br></br>
                        <DatePicker 
                            value={this.state.dateStarted}
                            // onChange={}
                        />
                    </Col>
                </Row>
                    
                <Row>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> Products:  </strong>
                                </Row>
                                <Row>
                                    <InputGroup >
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={currProduct}
                                            label="currProduct"
                                            placeholder="Add Another Product"
                                            onChange={handleProjectTextChange}
                                        />
                                        <InputGroup.Append>
                                            <Button size="sm" variant="outline-success" onClick={handleNewProduct} >+</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Row>
                            </Container>
                            <Container>
                                {products.map((product) => (
                                    <Row key={uuidv4()} >
                                        <Col>
                                            {product}
                                        </Col>
                                        <Col value={product} >
                                            <Badge pill variant="danger" style={{ cursor: "pointer" }} onClick={handleDeleteProduct}>X</Badge>
                                        </Col>
                                    </Row>
                                ))
                                }
                            </Container>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> Lot Numbers:  </strong>
                                </Row>
                                <Row>
                                    <InputGroup >
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={currLotNum}
                                            label="currLotNum"
                                            placeholder="Add Another Lot"
                                            onChange={handleProjectTextChange}
                                        />
                                        <InputGroup.Append>
                                            <Button size="sm" variant="outline-success" onClick={handleAddNewLot} >+</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Row>
                            </Container>
                            <Container>
                                {lotNums.map((lot) => (
                                    <Row key={uuidv4()} >
                                        <Col>
                                            {lot}
                                        </Col>
                                        <Col value={lot} >
                                            <Badge pill variant="danger" style={{ cursor: "pointer" }} onClick={handleDeleteLot}>X</Badge>
                                        </Col>
                                    </Row>
                                ))
                                }
                            </Container>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> Specs:  </strong>
                                </Row>
                                <Row>
                                    <InputGroup >
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={currSpec}
                                            label="currSpec"
                                            placeholder="Add Another Lot"
                                            onChange={handleProjectTextChange}
                                        />
                                        <InputGroup.Append>
                                            <Button size="sm" variant="outline-success" onClick={handleAddNewSpec} >+</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Row>
                            </Container>
                            <Container>
                                {specs.map((spec) => (
                                    <Row key={uuidv4()} >
                                        <Col>
                                            {spec}
                                        </Col>
                                        <Col value={spec} >
                                            <Badge pill variant="danger" style={{ cursor: "pointer" }} onClick={handleDeleteSpec}>X</Badge>
                                        </Col>
                                    </Row>
                                ))
                                }
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}