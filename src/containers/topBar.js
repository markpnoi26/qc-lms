import React from 'react'
import {Col} from 'react-bootstrap'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class TopBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        
        return (
            <React.Fragment>
                <Col xs={10}>
                    <h1>TopBar</h1>
                </Col>
                <Col>
                    <AmplifySignOut />
                </Col>
            </React.Fragment>
            
        )
    }
}