import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import NavBar from './containers/navBar'
import SideBar from './containers/sideBar'
import MainWindow from './containers/mainWindow'
import {withAuthenticator} from '@aws-amplify/ui-react';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Container fluid >
          <Row>
            <NavBar />
          </Row>
          <Row>
            <Col>
              <SideBar />
            </Col>
            <Col xs={8}>
              <MainWindow />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }

}

export default withAuthenticator(App);
