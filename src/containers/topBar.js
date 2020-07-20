import React from 'react'
import {Col} from 'react-bootstrap'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class TopBar extends React.Component {

    render() {
        
        return (
            <React.Fragment>
                <Col xs={10}>
                </Col>
                <Col>
                    <AmplifySignOut />
                </Col>
            </React.Fragment>
            
        )
    }
}