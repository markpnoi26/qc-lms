import React from 'react'
import {Form, Row, Col, Container} from 'react-bootstrap'

export default class EditLayoutForm extends React.Component {

    constructor(props) {
        let { projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage } = props
        super(props)
        this.state = {
            projectType,
            title,
            requester,
            tests,
            lotNums,
            analyst,
            dateIn,
            dateOut,
            nbPage,
            notes,
            currLotNum: ""
        }
    }

    render() {
        return(
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                label="projectType"
                                onChange={this.props.handleProjectInfoChange}
                                value={this.state.projectType}>
                                    <option value="">Select Project Type</option>
                                    <option value="P">(P) Project</option>
                                    <option value="S">(S) Stability</option>
                                    <option value="I">(I) Investigation</option>
                                    <option value="R">(I) Release</option>
                                    <option value="SQ">(SQ) Standard Qualification</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form>
                                <Form.Control
                                    as="select"
                                    size="sm"
                                    value={this.state.requester}
                                    onChange={(event) => this.setState({
                                        requester: event.target.value
                                    })}>
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
                                    value={this.state.analyst}
                                    onChange={(event) => this.setState({
                                        analyst: event.target.value
                                    })}>
                                    <option value="">Select Analyst</option>
                                    <option value="MD">MD</option>
                                    <option value="KH">KH</option>
                                    <option value="WM">WM</option>
                                </Form.Control>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Form>
        )
    }
}