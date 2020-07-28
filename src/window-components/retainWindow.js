import React from 'react'
import {Table} from 'react-bootstrap'

export default class RetainWindow extends React.Component {


    render() {
        return (
            <div>
                <Table bordered striped variant="dark" >
                    <thead>
                        <tr style={{ textAlign: "center" }} >
                            <th>QC Number</th>
                            <th>Project Type</th>
                            <th>Project Title</th>
                            <th>lot #</th>
                            <th>Sample #</th>
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