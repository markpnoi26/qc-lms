import React from 'react'
import {Form, Row, Col, Container} from 'react-bootstrap'

export default class EditLayoutForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currLotNum: ""
        }
    }

    render() {
        let { projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage } = this.props
        return(
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Control
                                as="select"
                                size="sm"
                                label="projectType"
                                onChange={this.props.handleProjectInfoChange}
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
                                onChange={this.props.handleProjectInfoChange}>
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
                                onChange={this.props.handleProjectInfoChange}>
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
                        
                    </Form>
                </Row>
            </Container>

        )
    }
}