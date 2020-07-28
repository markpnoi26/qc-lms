import React from "react";
import {Nav, Navbar,NavDropdown, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";
import {Auth} from 'aws-amplify';


async function signOut() {
    try {
        await Auth.signOut();
        window.location.reload(false);
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const Top = props => {

    return (
        <Navbar 
            expand="lg"
        >   
            <Navbar.Brand>QC-LMS</Navbar.Brand>
            <Nav
                variant="tabs"
                fill
                className="mr-auto"
            >
                {/* <Nav.Item>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link as={Link} to="/">QC Records</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link as={Link} to="/retain">QC Retains</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/stability" >Stability</Nav.Link>
                </Nav.Item> */}
            </Nav>
            <Nav className="mr-sm-2">
                <NavDropdown title={`Select Year:`} id="collapsible-nav-dropdown" onChange>
                    <NavDropdown.Item href="#action/3.1">2020</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">2019</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">2018</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#action/3.4">2017</NavDropdown.Item>
                </NavDropdown>
                <Button onClick={signOut} variant="outline-danger" >SignOut</Button>
            </Nav>
            
        </Navbar>
        
        );
  };
  const TopBar = withRouter(Top);

  export default TopBar