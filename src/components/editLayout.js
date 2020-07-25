import React from 'react'
import {Form, Row, Col, Container} from 'react-bootstrap'

export default class EditLayout extends React.Component {
    

    render() {
        return(
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm">
                                    <option value="">Select Type</option>
                                    <option value="P">(P) Project</option>
                                    <option value="S">(S) Stability</option>
                                    <option value="I">(I) Investigation</option>
                                    <option value="R">(I) Release</option>
                                    <option value="SQ">(SQ) Standard Qualification</option>
                            </Form.Control>
                                
                        </Col>
                    </Row>
                </Container>
            </Form>
        )
    }
}