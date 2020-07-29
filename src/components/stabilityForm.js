import React from 'react'
// import {Button, Form, InputGroup, FormControl, Row, Col, Container, Badge} from 'react-bootstrap'


export default class StabilityForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <tr style={{ textAlign: "center" }} >
                <th>Protocol</th>
                <th>Title</th>
                <th>Lot #</th>
                <th>Spec #</th>
                <th>STPs</th>
                <th>Condition</th>
                <th>Packaging</th>
                <th>Amount/Time Point</th>
                <th>Amount Unit</th>
                <th>Date Started</th>
                <th>Action</th>
            </tr>
        )
    }


}