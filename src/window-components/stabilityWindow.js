import React from 'react'
import StabilityForm from '../components/stabilityForm'
import {Table} from 'react-bootstrap'

export default class StabilityWindow extends React.Component {


    render() {
        return (
            <div>
                <Table bordered striped variant="dark" >
                    <thead>
                        <tr style={{ textAlign: "center" }} >
                            <th>Protocol</th>
                            <th>Title</th>
                            <th>Lot #</th>
                            <th>Spec #</th>
                            <th>STPs</th>
                            <th>Condition</th>
                            <th>Packaging</th>
                            <th>Amount/Time Point</th>
                            <th>Amount Unit</th>
                            <th>Date Started</th>
                            <th>Action</th>
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