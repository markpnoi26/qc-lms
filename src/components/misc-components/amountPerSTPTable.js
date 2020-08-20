import React from 'react'
import { Table } from 'react-bootstrap'

export default function AmountPerSTPTable(props) {

    return(
        <Table variant="dark">
            <tbody>
                {props.amountPerSTP.map(item => {
                    return (
                        <tr>
                            <td>STP-{item.stp}</td>
                            <td>{item.amount}{props.amountUnit}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}