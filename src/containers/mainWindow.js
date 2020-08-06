import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import HomeWindow from './window-containers/homeWindow'
import QCRecordWindow from './window-containers/qcRecordWindow'
import RetainWindow from './window-containers/retainWindow'
import StabilityWindow from './window-containers/stabilityWindow'
import NotValid from './window-containers/notValid'

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