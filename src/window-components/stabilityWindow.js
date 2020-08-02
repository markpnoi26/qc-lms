import React from 'react'
import StabilityForm from '../components/stabilityForm'
import {Table} from 'react-bootstrap'


/**
 * Stability protocol Window:
 * Protocol Number:
 * Products:
 * Spec:
 * 
 * Pull Schedule:
 * 
 */


export default class StabilityWindow extends React.Component {


    render() {
        return (
            <div>
                <Table bordered striped variant="dark" >
                    <thead>
                        <tr style={{ textAlign: "center" }} >
                            <th>Protocol</th>
                            <th>Products</th>
                            <th>Lot #</th>
                            <th>Spec #</th>
                            <th>STPs</th>
                            <th>Condition</th>
                            <th>Packaging</th>
                            <th>Amount/Time Point</th>
                            <th>Amount Unit</th>
                            <th>Date Started</th>
                            <th>Pull Schedule</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr style={{ textAlign: "center" }}>
                        </tr>
                        <StabilityForm />
                    </tbody>
                </Table>
            </div>
        )
    }
}