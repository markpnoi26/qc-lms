import React from 'react'
import {Row, Col, Badge} from 'react-bootstrap'


export default function StabilityBadgeComponent(props) {
    return (
        <Row>
            <Col>
                <div>
                    <h6> <Badge variant="info"> {props.item} </Badge></h6>
                </div>
            </Col>
        </Row>
    )
}
