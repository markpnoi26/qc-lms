import React from 'react'
import {Modal, Button, Row, Col, Container, Form, Table} from 'react-bootstrap'

export default class QCEntryModal extends React.Component {
    constructor(props) {
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage} = props.file
        super(props)
        this.state = {
            confirmUpdateOpen: false,
            confirmDeleteOpen: false,
            changeDetected: false,
            savedChanges: false,
            num,
            projectType,
            title,
            tests,
            lotNums,
            dateIn,
            dateOut,
            requester,
            analyst,
            notes,
            nbPage
        }
    }

    onCloseModal = () => {
        if (this.state.changeDetected && !this.state.savedChanges) {
            this.setState({
                changeDetected: false,
                savedChanges: false,
                ...this.props.file
            }, this.props.onHide)
        } else {
            this.props.onHide()
        }
    }

    setUpdateConfirmation = () => {
        this.setState({
            confirmUpdateOpen: !this.state.confirmUpdateOpen
        })
    }

    setDeleteConfirmation = () => {
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
    }

    onClickUpdate = (event) => {
        // this will ultimately update the db
        // on submit, update db, update state, 
        console.log(event.target.value)
        this.setState({
            confirmUpdateOpen: !this.state.confirmUpdateOpen
        })
    }

    onClickDelete = (event) => {
        console.log(event.target.value)
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
    }

    handleTestOnCheckModal = (event) => {
        console.log("testing....")
        this.setState({
            ...this.state,
            changeDetected: true,
            tests: {
                ...this.state.tests,
                [event.target.value]: !this.state.tests[event.target.value] 
            }
        })
    }

    render() {
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst, notes, nbPage} = this.state

        const physSpecID = [
            ["colorAndAppearance", "lod", "ash"],
            ["particleSize", "solids", "odor"],
            ["meltingPoint", "ftir", "nmr"]
        ]

        const physSpecLabel = [
            ["Color & Appearance", "LOD", "Ash"],
            ["Particle Size", "Solids", "Odor"],
            ["Melting Pt.", "FTIR", "NMR"]
        ]

        const chromatographicID = [
            ["hplc", "gcms", "hptlc", "sec"]
        ]

        const chromatographicLabel = [
            ["HPLC", "GCMS", "HPTLC", "SEC"]
        ]

        const microbialID = [
            ["totalPlateCount", "coliform", "yeastAndMold"], 
            ["eColi", "salmonella"]
        ]

        const microbialLabel = [
            ["TPC", "Coliform", "Y&M"], 
            ["E.Coli", "Salmonella"]
        ]

        const heavyMetalsID = [
            ["arsenic", "lead", "mercury", "cadmium"]
        ]

        const heavyMetalsLabel = [
            ["As", "Pb", "Hg", "Cd"]
        ]

        const otherID = [
            ["uvVis", "retain"]
        ]

        const otherLabel = [
            ["UV/Vis", "Retain"]
        ]

        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={'static'}
                centered
            >
                <Modal.Header >
                    <Container fluid>
                        <Row>
                            <Modal.Title id="contained-modal-title-vcenter">
                                QC{num} - ({projectType}) - {title}
                            </Modal.Title>
                        </Row>
                        <Row>
                            <Col>
                                {lotNums.map(lot=> {
                                    return `${lot} `
                                })}
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Edit Title, Project Type Here...
                            </Col>

                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                Date in: {dateIn}
                            </Col>
                            <Col>
                                Date out: {dateOut}
                            </Col>
                            <Col>
                                Requested By: {requester}
                            </Col>
                            <Col>
                                Main Analyst: {analyst}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Table size="sm" variant="dark">
                                        <tbody>
                                            <tr>
                                                <td colSpan="3"> Physical/Spectroscopic </td>
                                            </tr>
                                            {physSpecID.map((section, i) => {
                                                return (
                                                    <tr key={`psModal${i}`}> 
                                                        {section.map((test, idx) => {
                                                            return (
                                                                <td key={`pModal${idx}`}> 
                                                                    <Form.Check  
                                                                        value={test}
                                                                        type="switch"
                                                                        label={physSpecLabel[i][idx]}
                                                                        id={`pModal${test}`}
                                                                        checked={tests[test]} 
                                                                        onChange={this.handleTestOnCheckModal}
                                                                    />
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Form>
                                <Form>
                                    <Table size="sm" variant="dark">
                                        <tbody>
                                            <tr>
                                                <td colSpan="8"> Chromatographic </td>
                                            </tr>
                                            {chromatographicID.map((section, i) => {
                                                return (
                                                    <tr key={`csModal${i}`}>
                                                        {section.map((test, idx) => {
                                                            return (
                                                                <td key={`cModal${idx}`}>
                                                                    <Form.Check  
                                                                        value={test}
                                                                        type="switch"
                                                                        label={chromatographicLabel[i][idx]}
                                                                        id={`cModal${test}`}
                                                                        checked={tests[test]} 
                                                                        onChange={this.handleTestOnCheckModal}
                                                                    />
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Form>
                                <Form>
                                    <Table size="sm" variant="dark">
                                        <tbody>
                                            <tr>
                                                <td colSpan="8"> Microbial </td>
                                            </tr>
                                            {microbialID.map((section, i) => {
                                                return (
                                                    <tr key={`msModal${i}`}>  
                                                        {section.map((test, idx) => {
                                                            return (
                                                                <td key={`mModal${idx}`}>
                                                                    <Form.Check  
                                                                        value={test}
                                                                        type="switch"
                                                                        label={microbialLabel[i][idx]}
                                                                        id={`mModal${test}`}
                                                                        checked={tests[test]} 
                                                                        onChange={this.handleTestOnCheckModal}
                                                                    />
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Form>
                                <Form>
                                    <Table size="sm" variant="dark">
                                        <tbody>
                                            <tr>
                                                <td colSpan="8"> Heavy Metals </td>
                                            </tr>
                                            {heavyMetalsID.map((section, i) => {
                                                return (
                                                    <tr key={`hmsModal${i}`}> 
                                                        {section.map((test, idx) => {
                                                            return (
                                                                <td key={`hmModal${idx}`}>
                                                                    <Form.Check  
                                                                        value={test}
                                                                        type="switch"
                                                                        label={heavyMetalsLabel[i][idx]}
                                                                        id={`hmModal${test}`}
                                                                        checked={tests[test]} 
                                                                        onChange={this.handleTestOnCheckModal}
                                                                    />
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Form>
                                <Form>
                                    <Table size="sm" variant="dark">
                                        <tbody>
                                            <tr>
                                                <td colSpan="8"> Other </td>
                                            </tr>
                                            {otherID.map((section, i) => {
                                                return (
                                                    <tr key={`osModal${i}`}> 
                                                        {section.map((test, idx) => {
                                                            return (
                                                                <td key={`oModal${idx}`}>
                                                                    <Form.Check  
                                                                        value={test}
                                                                        type="switch"
                                                                        label={otherLabel[i][idx]}
                                                                        id={`oModal${test}`}
                                                                        checked={tests[test]} 
                                                                        onChange={this.handleTestOnCheckModal}
                                                                    />
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Form>
                            
                            </Col>
                        </Row>
                        <Row>
                            <p>{notes}</p>
                            <p>{nbPage}</p>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer hidden={this.state.confirmUpdateOpen || this.state.confirmDeleteOpen}>
                    <Button variant="info" onClick={this.setUpdateConfirmation} disabled={!this.state.changeDetected}>Save</Button>
                    <Button variant="danger" onClick={this.setDeleteConfirmation}>Delete</Button>
                    <Button onClick={this.onCloseModal}>Close</Button>
                </Modal.Footer>
                <Modal.Footer hidden={!this.state.confirmUpdateOpen}>
                    Are you sure you want to save updates to this QC File?
                    <Button variant="outline-success" onClick={this.onClickUpdate} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickUpdate} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmDeleteOpen}>
                    Are you sure you want to delete this QC File?
                    <Button variant="outline-success" onClick={this.onClickDelete} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickDelete} value="no">No</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}