import React from "react";
import {Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";
import { AmplifySignOut } from '@aws-amplify/ui-react';
import '../styles/sidebar.scss'

const Side = props => {

    return (
        <>

            <Nav 
                className="d-none d-md-block bg-light sidebar"
            >
                <div className="sidebar-sticky">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/records">QC Records</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/retain">QC Retains</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/stability" >Stability</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <AmplifySignOut />
                    </Nav.Item>
                </div>
            </Nav>

        </>
        );
  };
  const SideBar = withRouter(Side);
  export default SideBar