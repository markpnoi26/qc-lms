import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => {
  return (
    <div>
      <AmplifySignOut />
      QC-LMS
    </div>
  );
}

export default withAuthenticator(App);
