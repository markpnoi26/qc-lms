import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import {withAuthenticator} from '@aws-amplify/ui-react';
import {connect} from 'react-redux'
import TopBar from './containers/topBar'
import MainWindow from './containers/mainWindow'
import LoadingOverlay from 'react-loading-overlay';


class App extends React.Component {

  render() {
    return (
      <LoadingOverlay 
        active={this.props.fetchStatus}
        spinner={ <Spinner animation="border" variant="info" />}
        >
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
      </LoadingOverlay>
    );
  }

}

const mapStateToProps = state => {
  return {
    fetchStatus: state.fetchStatus
  }
}

export default withAuthenticator(connect(mapStateToProps, null)(App));
