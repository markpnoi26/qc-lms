import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import HomeWindow from '../window-components/homeWindow'
import QCRecordWindow from '../window-components/qcRecordWindow'
import RetainWindow from '../window-components/retainWindow'
import StabilityWindow from '../window-components/stabilityWindow'
import NotValid from '../window-components/notValid'

export default class MainWindow extends React.Component {

    render() {

        return (
            <Container fluid>
                <Switch>
                    <Route exact path="/" component={HomeWindow} />
                    <Route path="/records" component={QCRecordWindow} />
                    <Route path="/retain" component={RetainWindow} />
                    <Route path="/stability" component={StabilityWindow} />
                    <Route component={NotValid} />
                </Switch>
            </Container>
                
        )
    }
}