import React from 'react'
import {Col} from 'react-bootstrap'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class NavBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        
        return (
            <React.Fragment>
                <Col xs={10}>
                    This is the Navigation bar which contains the logout button
                </Col>
                <Col>
                    <AmplifySignOut />
                </Col>
            </React.Fragment>
            
        )
    }
}