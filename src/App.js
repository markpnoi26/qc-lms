import React from 'react';
import NavBar from './containers/navBar'
import SideBar from './containers/sideBar'
import MainWindow from './containers/mainWindow'
import {withAuthenticator} from '@aws-amplify/ui-react';

const App = () => {

  const appStyle={
    display: "flex",
    flexDirection: "column"
  }

  const barStyle={
    flexDirection: "row"
  }

  return (
    <div style={appStyle}>
      <div>
        <NavBar />
      </div>
      <div style={barStyle}>
        <SideBar />
        <MainWindow />
      </div>

      QC-LMS
    </div>
  );
}

export default withAuthenticator(App);
