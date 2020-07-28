import React from "react";
import {Nav, Navbar,NavDropdown, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {withRouter} from "react-router";
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Auth, API} from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
        window.location.reload(false);
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

class TopBar extends React.Component {

    onYearChange = (eventKey) => {
        console.log(eventKey.year)
        this.props.updateCurrentYear(eventKey.year)

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {
                currentYear: eventKey.year
            }
        }

        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.props.setCurrentQCFiles(response.data)
            })
            .then(() => {
                // set the next available qc file
            
                const currentQCFiles = this.props.currentQCFiles
                const start = eventKey.year.substring(2,4) + "001"
                
                let startQCFile = parseInt(start, 10)
                for (let i = 0; i<currentQCFiles.length; i++) {
                    const stringedFileNum = JSON.stringify(startQCFile)
                    if (currentQCFiles[i].num !== stringedFileNum) {
                        this.props.setCurrentAvailableQCFile(stringedFileNum)
                        return stringedFileNum
                    }
                    startQCFile++
                }
                this.props.setCurrentAvailableQCFile(JSON.stringify(startQCFile))
            })
            .catch(error => {
                console.log(error)
            })
    }

    render () {
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
                <Nav className="mr-sm-2" >
                    <NavDropdown title={`Select Year: ${this.props.currentYear}`} id="collapsible-nav-dropdown" >
                        <NavDropdown.Item onSelect={() => this.onYearChange({year: "2020"})}>2020</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({year: "2019"})}>2019</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({year: "2018"})}>2018</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({year: "2017"})}>2017</NavDropdown.Item>
                    </NavDropdown>
                    <Button onClick={signOut} variant="outline-danger" >SignOut</Button>
                </Nav>
                
            </Navbar>
            
        );
    }
    
};


const mapStateToProps = state => {
    return {
        fetchStatus: state.fetchStatus,
        currentQCFiles: state.currentQCFiles,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentYear: (year) => dispatch({type: "UPDATE_YEAR", payload: year}),
        setCurrentAvailableQCFile: (number) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: number}),
        setCurrentQCFiles: (qcFiles) => dispatch({type: "SET_CURRENT_QC_FILES", payload: qcFiles})
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))