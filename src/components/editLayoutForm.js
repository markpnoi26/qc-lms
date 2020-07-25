import React from 'react'
import {Form, Row, Col, Container, InputGroup, FormControl, Button} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import {DashCircleFill} from 'react-bootstrap-icons'

export default class EditLayoutForm extends React.Component {

    render() {
        let { projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, nbPage, currLotNum, handleProjectInfoChange, handleProjectTextChange, handleAddNewLot, handleDeleteLot} = this.props
        return(
            <Container>
                <Row>
                    <Col>
                        <Form>
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
                                    <option value="R">(I) Release</option>
                                    <option value="SQ">(SQ) Standard Qualification</option>
                            </Form.Control>
                        </Form>    
                    </Col>
                    <Col>
                        <Form>
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
                    <Form>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col> 
                        <Col>
                            <Container>
                                <Row>
                                    <InputGroup >
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={currLotNum}
                                            label="currLotNum"
                                            placeholder="New Lot"
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
                                    <Row key={uuidv4()}>
                                        <Col>
                                            {lot}
                                        </Col> 
                                        <Col>
                                            <DashCircleFill size="11" color="red" style={{ cursor: "pointer" }} onClick={handleDeleteLot} value={"lot"} />
                                        </Col>
                                        
                                    </Row>
                                
                                    ))
                                }
                            </Container>    
                        </Col>  
                    </Form>
                </Row>
            </Container>

        )
    }
}