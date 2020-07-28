import React from 'react'
import {Table} from 'react-bootstrap'

export default class StabilityWindow extends React.Component {


    render() {
        return (
            <div>
                <Table bordered striped variant="dark" >
                    <thead>
                        <tr style={{ textAlign: "center" }} >
                            <th>Protocol Number</th>
                            <th>Project Title</th>
                            <th>lot #</th>
                            <th>Condition</th>
                            <th>Date Started</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr style={{ textAlign: "center" }}>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}