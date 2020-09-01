import React from 'react'
import {Form, Row, Col, Container, InputGroup, FormControl, Button, Badge} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import '../styles/date-picker.css'


export default class EditQCForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            currDateIn: props.dateIn !== "" ? moment(props.dateIn, "MM/DD/YYYY").toDate(): null,
            currDateOut: props.dateOut !== "" ? moment(props.dateOut, "MM/DD/YYYY").toDate(): null
        }
    }

    render() {
        let { projectType, title, lotNums, requester, analyst, nbPage, currLotNum, handleProjectInfoChange, handleProjectTextChange, handleAddNewLot, handleDeleteLot, handleDateInChange, handleDateOutChange} = this.props
        return(
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> QC Title:  </strong>
                                </Row>
                                <Row>
                                    
                                    <Form.Control 
                                        type="text"
                                        size="sm"
                                        placeholder="Title" 
                                        label="title"
                                        value={title} 
                                        onChange={handleProjectTextChange}
                                    >
                                    </Form.Control>
                                    
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> Note Book Page:  </strong>
                                </Row>
                                <Row>
                                    
                                    <Form.Control 
                                        type="text"
                                        size="sm"
                                        placeholder="Notebook Pages" 
                                        value={nbPage} 
                                        label="nbPage"
                                        onChange={handleProjectTextChange}
                                    >
                                    </Form.Control>
                                    
                                </Row>
                            </Container>
                        </Form>
                    </Col>   
                    
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <strong> Project Type:  </strong>
                            <Form.Control
                                as="select"
                                size="sm"
                                label="projectType"
                                onChange={handleProjectInfoChange}
                                value={projectType}>
                                    <option value="">Select Project Type</option>
                                    <option value="P">(P) Project</option>
                                    <option value="S">(S) Stability</option>
                                    <option value="I">(I) Investigation</option>
                                    <option value="R">(R) Release</option>
                                    <option value="SQ">(SQ) Standard Qualification</option>
                            </Form.Control>
                        </Form>    
                    </Col>
                    <Col>
                        <Form>
                            <strong> Requester: </strong>
                            <Form.Control
                                as="select"
                                size="sm"
                                label="requester"
                                value={requester}
                                onChange={handleProjectInfoChange}>
                                    <option value="">Select Requester</option>
                                    <option value="QC">QC</option>
                                    <option value="NP">NP</option>
                                    <option value="Other">Other</option>
                            </Form.Control>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <strong> Analyst: </strong>
                            <Form.Control
                                as="select"
                                size="sm"
                                label="analyst"
                                value={analyst}
                                onChange={handleProjectInfoChange}>
                                    <option value="">Select Analyst</option>
                                    <option value="MD">MD</option>
                                    <option value="KH">KH</option>
                                    <option value="WM">WM</option>
                            </Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row>
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
                                    <strong> Date In:  </strong>
                                </Row>
                                <Row>
                                    <DatePicker 
                                        value={this.state.currDateIn}
                                        onChange={(value) => {
                                            const date = moment(value).format("L")
                                            if (date === "Invalid date") {
                                                handleDateInChange("")
                                            } else {
                                                handleDateInChange(date)
                                            }
                                            this.setState({
                                                currDateIn: value
                                            })
                                        }}
                                    />
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Container>
                                <Row>
                                    <strong> Date Out:  </strong>
                                </Row>
                                <Row>
                                    <DatePicker 
                                        value={this.state.currDateOut}
                                        onChange={(value) => {
                                            const date = moment(value).format("L")
                                            if (date === "Invalid date") {
                                                handleDateOutChange("")
                                            } else {
                                                handleDateOutChange(date)
                                            }
                                            this.setState({
                                                currDateOut: value
                                            })
                                        }}
                                    />
                                </Row>
                            </Container>
                        </Form>
                    </Col>   
                </Row>
            </Container>

        )
    }
}