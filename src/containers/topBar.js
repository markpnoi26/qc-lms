import React from 'react'
import {Col} from 'react-bootstrap'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class TopBar extends React.Component {

    render() {
        
        return (
            <React.Fragment>
                <Col >
                    <h1>QC-LMS</h1>
                </Col>
            </React.Fragment>
            
        )
    }
}