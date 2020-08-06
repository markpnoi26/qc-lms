import React from 'react'
import {Table, Form} from 'react-bootstrap'
import { v4 as uuidv4} from 'uuid'

export default class TestSelection extends React.Component {

    render() {

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
            <>
                <Form>
                    <Table size="sm" variant="dark">
                        <tbody>
                            <tr>
                                <td colSpan="3"> Physical/Spectroscopic </td>
                            </tr>
                            {physSpecID.map((section, i) => {
                                return (
                                    <tr key={uuidv4()}> 
                                        {section.map((test, idx) => {
                                            return (
                                                <td key={uuidv4()}> 
                                                    <Form.Check  
                                                        value={test}
                                                        type="switch"
                                                        label={physSpecLabel[i][idx]}
                                                        id={uuidv4()}
                                                        checked={this.props.tests[test]} 
                                                        onChange={this.props.handleTestsOnCheck}
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
                                    <tr key={uuidv4()}>
                                        {section.map((test, idx) => {
                                            return (
                                                <td key={uuidv4()}>
                                                    <Form.Check 
                                                        value={test}
                                                        type="switch"
                                                        label={chromatographicLabel[i][idx]}
                                                        id={this.props.uniqueID + uuidv4()}
                                                        checked={this.props.tests[test]} 
                                                        onChange={this.props.handleTestsOnCheck}
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
                                    <tr key={uuidv4()}>  
                                        {section.map((test, idx) => {
                                            return (
                                                <td key={uuidv4()}>
                                                    <Form.Check  
                                                        value={test}
                                                        type="switch"
                                                        label={microbialLabel[i][idx]}
                                                        id={this.props.uniqueID + uuidv4()}
                                                        checked={this.props.tests[test]} 
                                                        onChange={this.props.handleTestsOnCheck}
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
                                    <tr key={uuidv4()}> 
                                        {section.map((test, idx) => {
                                            return (
                                                <td key={uuidv4()}>
                                                    <Form.Check  
                                                        value={test}
                                                        type="switch"
                                                        label={heavyMetalsLabel[i][idx]}
                                                        id={this.props.uniqueID + uuidv4()}
                                                        checked={this.props.tests[test]} 
                                                        onChange={this.props.handleTestsOnCheck}
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
                                    <tr key={uuidv4()}> 
                                        {section.map((test, idx) => {
                                            return (
                                                <td key={uuidv4()}>
                                                    <Form.Check  
                                                        value={test}
                                                        type="switch"
                                                        label={otherLabel[i][idx]}
                                                        id={this.props.uniqueID + uuidv4()}
                                                        checked={this.props.tests[test]} 
                                                        onChange={this.props.handleTestsOnCheck}
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
            </>
        )
    }
}