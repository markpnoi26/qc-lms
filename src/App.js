import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import TopBar from './containers/topBar'
import MainWindow from './containers/mainWindow'
import {withAuthenticator} from '@aws-amplify/ui-react';

class App extends React.Component {

  render() {
    return (
        <Container style={{fontSize: 14}} fluid >
          <Router>
            <Row>
              <Col>
                <TopBar />
                <MainWindow />
              </Col>
            </Row>
          </Router>
        </Container>
    );
  }

}

export default withAuthenticator(App);
