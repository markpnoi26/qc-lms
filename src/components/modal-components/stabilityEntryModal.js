import React from 'react'
import {Modal, Button, Row, Col, Toast} from 'react-bootstrap'

export default class StabilityEntryModal extends React.Component {
    constructor(props) {
        super(props)
        let { stabilityProtocolNum, products, lotNums, specs, condition, packaging, amountUnit, amountPerTimePt, dateStarted, amountPerSTP, pullDates, notes } = this.props.protocol
        super(props)
        this.state = {
            confirmUpdateOpen: false,
            confirmDeleteOpen: false,
            confirmCloseModalOpen: false,
            changeDetected: false,
            stabilityProtocolNum,
            products,
            lotNums,
            specs,
            condition,
            packaging,
            amountUnit,
            amountPerTimePt,
            dateStarted,
            amountPerSTP,
            pullDates,
            notes,
            currLotNum: "",
            editorState: null
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={'static'}
                centered
                hidden={this.props.fetchStatus}    
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Protocol 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>    
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}