import React from 'react'
import StabilityForm from '../components/stabilityForm'
import {Table} from 'react-bootstrap'
import {API} from 'aws-amplify'


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

    componentDidMount = () => {

        const params ={
            headers:{},
            response: true,
            queryStringParameters: {}
        }

        API.get("stabilityAPI", "/stability", params)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

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