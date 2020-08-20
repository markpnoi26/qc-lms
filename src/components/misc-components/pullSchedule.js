import React from 'react'
import { Table, Form } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

export default function PullSchedule(props) {


    const sortedDates = Object.keys(props.pullDates).map(key => {
        return key
    })

    sortedDates.sort((a, b) => {
        return new Date(a) - new Date(b)
    })

    return (
        <Table bordered striped variant="dark" style={{textAlign: "center"}}>
            <thead>
                <tr>
                    <th>Pull Dates</th>
                    <th>Total Amount</th>
                    <th>Pulled</th>
                </tr>
            </thead>
            <tbody>
                {sortedDates.map(date => {
                    return (
                        <tr key={uuidv4()} >
                            <td>{date}</td>
                            <td>{props.amountPerTimePt}{props.amountUnit}</td>
                            <td><Form.Check checked={props.pullDates[date]} onChange={() => props.handlePullDateChange(date)}></Form.Check></td>
                        </tr>
                        
                    )
                })}
            </tbody>
        </Table>
    )
}
