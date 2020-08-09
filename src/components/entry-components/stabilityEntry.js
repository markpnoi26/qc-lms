import React from 'react'
import {Row, Col, Container, Button} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

import StabilityEntryModal from '../modal-components/stabilityEntryModal'

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
                            <Row
                                key={uuidv4()}>
                                {prod}
                            </Row>
                        )
                        )}
                    </Container>
                </td>
                <td>
                    <Container fluid>
                        {lotNums.map((lot) => (
                            <Row
                                key={uuidv4()}>
                                {lot}
                            </Row>
                        )
                        )}
                    </Container>
                </td>
                <td>
                    <Container fluid>
                        {specs.map((spec) => (
                            <Row
                                key={uuidv4()}>
                                {spec}
                            </Row>
                        )
                        )}
                    </Container>
                </td>
                <td>{condition}</td>
                <td>{packaging}</td>
                <td>
                    <Container fluid>
                        {amountPerSTP.map((item) => (
                            <Row
                                key={uuidv4()}>
                                <Col>
                                    STP-{item.stp}
                                </Col>
                                <Col>
                                    {item.amount}{amountUnit}
                                </Col>
                                
                            </Row>
                        )
                        )}
                    </Container>
                </td>
                <td>{amountUnit}</td>
                <td>{amountPerTimePt}</td>
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
                    file={this.props.protocol}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                />

            </>
        )
    }
}