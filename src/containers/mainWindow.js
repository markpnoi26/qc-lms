import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import QCRecordWindow from '../window-components/qcRecordWindow'
import RetainWindow from '../window-components/retainWindow'
import StabilityWindow from '../window-components/stabilityWindow'
import NotValid from '../window-components/notValid'

export default class MainWindow extends React.Component {
    constructor() {
        super() 
        this.state={

        }
    }

    render() {

        return (
            <Container >
                <h1>This is now the main window Container</h1>
                <Switch>
                    <Route exact path="/" component={QCRecordWindow} />
                    <Route path="/retain" component={RetainWindow} />
                    <Route path="/stability" component={StabilityWindow} />
                    <Route component={NotValid} />
                </Switch>
            </Container>
                
        )
    }
}