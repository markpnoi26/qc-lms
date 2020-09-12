import React from "react";
import {Nav, Navbar, NavDropdown, Button, Form, FormControl} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {withRouter} from "react-router";
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

        this.props.updateCurrentYear(eventKey.year)

        switch(this.props.currentActiveWindow) {
            case "qcfiles":
                return this.qcFilesAPICall(eventKey)
            case "stability":
                return this.stabilityProtocolsAPICall(eventKey)
            default:
                console.log("No API calls needed.")
        }
    }

    qcFilesAPICall = (eventKey) => {

        const params = {
            headers: {},
            response: true,
            queryStringParameters: {
                currentYear: eventKey.year
            }
        }
        this.props.currentlyFetching()
        API.get("qcfilesAPI", "/qcfiles", params)
            .then(response => {
                this.props.fetchSuccess()
                this.props.setCurrentQCFiles(response.data)
            })
            .then(() => {
                // set the next available qc file

                const currentQCFiles = this.props.currentQCFiles
                const start = eventKey.year.substring(2, 4) + "001"

                let startQCFile = parseInt(start, 10)
                for (let i = 0; i < currentQCFiles.length; i++) {
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
                this.props.fetchFail()
                console.log(error)
            })
    }

    stabilityProtocolsAPICall = (eventKey) => {
        const params = {
            headers: {},
            response: true,
            queryStringParameters: {
                currentYear: eventKey.year
            }
        }
        this.props.currentlyFetching()
        API.get("stabilityAPI", "/stability", params)
            .then(response => {
                this.props.fetchSuccess()
                this.props.setCurrentStabilityProtocols(response.data)
            })
            .then(() => {
                const currentStabilityProtocols = this.props.currentStabilityProtocols
                let start = 1, stringedNum, stabilityProtocolNum

                for (let i = 0; i < currentStabilityProtocols.length; i++) {
                    stringedNum = start <= 9 ? `0${start}` : `${start}`
                    stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                    if (currentStabilityProtocols[i].stabilityProtocolNum !== stabilityProtocolNum) {
                        this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
                        return stabilityProtocolNum
                    }
                    start++
                }
                stringedNum = start <= 9 ? `0${start}` : `${start}`
                stabilityProtocolNum = `${this.props.currentYear.substring(2, 4)}${stringedNum}`
                this.props.setCurrentAvailableStabilityProtocol(stabilityProtocolNum)
            })
            .catch(error => {
                this.props.fetchFail()
                console.log({ error })
            })
    }

    componentDidMount = () => {
        this.props.setCurrentYear()
    }

    render () {
        let searchTimer

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
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/records">QC Records</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link as={Link} to="/retain">QC Retains</Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                        <Nav.Link as={Link} to="/stability" >Stability</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form inline>
                    <FormControl 
                        type="text" 
                        placeholder="Lot, QC, Protocol, etc.." 
                        className="mr-sm-2" 
                        onChange={
                            (event) => {
                                clearTimeout(searchTimer)
                                searchTimer = setTimeout((value) => {this.props.searchBar(value)}, 500, event.target.value)
                            }
                        }/>
                </Form>
                <Nav className="mr-sm-2" >
                    <NavDropdown title={`Select Year: ${this.props.currentYear}`} id="collapsible-nav-dropdown" >
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2020" })}>2020</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2019" })}>2019</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2018" })}>2018</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2017" })}>2017</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2016" })}>2016</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => this.onYearChange({ year: "2015" })}>2015</NavDropdown.Item>
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
        currentStabilityProtocols: state.currentStabilityProtocols,
        currentActiveWindow: state.currentActiveWindow,
        currentYear: state.currentYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchBar: (text) => dispatch({type: "SET_SEARCH", payload: text.toLowerCase()}),
        updateCurrentYear: (year) => dispatch({type: "UPDATE_YEAR", payload: year}),
        setCurrentAvailableQCFile: (number) => dispatch({type: "SET_AVAILABLE_QC_FILE", payload: number}),
        setCurrentQCFiles: (qcFiles) => dispatch({type: "SET_CURRENT_QC_FILES", payload: qcFiles}),
        setCurrentStabilityProtocols: (protocols) => dispatch({ type: "SET_CURRENT_STABILITY_PROTOCOLS", payload: protocols}),
        setCurrentAvailableStabilityProtocol: (protocolNum) => dispatch({ type: "SET_AVAILABLE_STABILITY_PROTOCOL", payload: protocolNum }),
        setCurrentYear: () => dispatch({type: "SET_CURRENT_YEAR"}),
        currentlyFetching: () => dispatch({type: "CURRENTLY_FETCHING"}),
        fetchSuccess: () => dispatch({type: "SUCCESS_FETCHING"}),
        fetchFail: () => dispatch({type: "FAILED_FETCHING"}),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))