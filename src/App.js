import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import TopBar from './containers/topBar'
import SideBar from './containers/sideBar'
import MainWindow from './containers/mainWindow'
import {withAuthenticator} from '@aws-amplify/ui-react';

class App extends React.Component {

  render() {
    return (
        <Container fluid >
          <Row>
            <TopBar />
          </Row>
          <Router>
            <Row>
              <Col>
                <SideBar />
              </Col>
              <Col xs={10}>
                <MainWindow />
              </Col>
            </Row>
          </Router>
        </Container>
    );
  }

}

export default withAuthenticator(App);
