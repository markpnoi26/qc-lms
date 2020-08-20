import React from 'react'
import AmountPerSTPTable from './amountPerSTPTable'
import { Table, Form } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

export default function PullSchedule(props) {

    const sortedDates = Object.keys(props.pullDates).map(key => key)
    const timePoints25 = [0, 3, 6, 9, 12, 18, 24, 36, 48, 60]
    const timePoints40 = [0, 1, 3, 6]
    let currentTimePoint

    if (sortedDates.length === 10) {
        currentTimePoint = timePoints25
    } else {
        currentTimePoint = timePoints40
    }
    sortedDates.sort((a, b) => {
        return new Date(a) - new Date(b)
    })

    return (
        <Table bordered striped variant="dark" size="sm" style={{textAlign: "center", fontSize: "12px"}}>
            <thead>
                <tr>
                    <th>Time Point</th>
                    <th>Pull Dates</th>
                    <th>Amount/STP</th>
                    <th>Total Amount</th>
                    <th>Pulled</th>
                </tr>
            </thead>
            <tbody>
                {sortedDates.map((date, idx) => {
                    return (
                        <tr key={uuidv4()} >
                            <td>{currentTimePoint[idx]}</td>
                            <td>{date}</td>
                            <td>
                                <AmountPerSTPTable 
                                    amountUnit={props.amountUnit} 
                                    amountPerSTP={props.amountPerSTP}
                                />
                            </td>
                            <td>{props.amountPerTimePt}{props.amountUnit}</td>
                            <td><Form.Check checked={props.pullDates[date]} onChange={() => props.handlePullDateChange(date)}></Form.Check></td>
                        </tr>
                        
                    )
                })}
            </tbody>
        </Table>
    )
}
