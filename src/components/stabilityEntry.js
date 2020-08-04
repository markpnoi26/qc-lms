import React from 'react'


export default class StabilityEntry extends React.Component {
    constructor() {
        super()
        this.state={}
    }

    render() {
        return(
            <>
                <td>Protocol</td>
                <td>Products</td>
                <td>Lot #</td>
                <td>Spec #</td>
                <td>STPs</td>
                <td>Condition</td>
                <td>Packaging</td>
                <td>Amount/Time Point</td>
                <td>Amount Unit</td>
                <td>Date Started</td>
                <td>Action</td>
            </>
        )
    }
}