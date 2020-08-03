import React from 'react'
import {API} from 'aws-amplify'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
// import {Button, Form, InputGroup, FormControl, Row, Col, Container, Badge} from 'react-bootstrap'


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
            stpNUm: "",
            amount: ""
        }
    }

    render() {
        return (
            <tr style={{ textAlign: "center" }} >
                <th>Protocol</th>
                <th>Products</th>
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