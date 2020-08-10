import React from 'react'
import {Container, Button, Table} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

import StabilityEntryModal from '../modal-components/stabilityEntryModal'
import StabilityBadgeComponent from '../misc-components/stabilityBadgeComponent'

export default class StabilityEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    render() {
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP } = this.props.protocol
        return(
            <>
                <td>{stabilityProtocolNum}</td>
                <td>
                    <Container fluid>
                        {products.map((prod) => (
                                <StabilityBadgeComponent key={uuidv4()} item={prod} />
                            )
                        )}
                    </Container>
                </td>
                <td>
                    <Container fluid>
                        {lotNums.map((lot) => (
                                <StabilityBadgeComponent key={uuidv4()} item={lot} />
                            )
                        )}
                    </Container>
                </td>
                <td>
                    <Container fluid>
                        {specs.map((spec) => (
                                <StabilityBadgeComponent key={uuidv4()} item={spec} />
                            )
                        )}
                    </Container>
                </td>
                <td>{condition}</td>
                <td>{packaging}</td>
                <td>
                    <Table bordered striped variant="dark" >
                        <tbody>
                            {amountPerSTP.map((item) => (
                                <tr
                                    key={uuidv4()}>
                                    <td>
                                        STP-{item.stp}
                                    </td>
                                    <td>
                                        {item.amount}{amountUnit}
                                    </td>
                                    
                                </tr>
                            )
                            )}
                        </tbody>
                        
                    </Table>
                </td>
                <td>{amountPerTimePt}</td>
                <td>{amountUnit}</td>
                <td>{dateStarted}</td>
                <td style={{ textAlign: "center" }}>
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => this.setModalShow()}>
                        Open
                    </Button>
                </td>

                <StabilityEntryModal 
                    protocol={this.props.protocol}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                />

            </>
        )
    }
}