import React from 'react';

import NavBar from './containers/navBar'
import SideBar from './containers/sideBar'
import MainWindow from './containers/mainWindow'
import {withAuthenticator} from '@aws-amplify/ui-react';

class App {

  render() {
    return (
      <div >
        <div>
          <NavBar />
        </div>
        <div>
          <SideBar />
          <MainWindow />
        </div>
  
        QC-LMS
      </div>
    );
  }

}

export default withAuthenticator(App);
