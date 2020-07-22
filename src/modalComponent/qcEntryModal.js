import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class QCEntryModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmUpdateOpen: false,
            confirmDeleteOpen: false
        }
    }

    setUpdateConfirmation = () => {
        this.setState({
            confirmUpdateOpen: !this.state.confirmUpdateOpen
        })
    }

    setDeleteConfirmation = () => {
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
    }

    onClickUpdate = (event) => {
        console.log(event.target.value)
        this.setState({
            confirmUpdateOpen: !this.state.confirmUpdateOpen
        })
    }

    onClickDelete = (event) => {
        console.log(event.target.value)
        this.setState({
            confirmDeleteOpen: !this.state.confirmDeleteOpen
        })
    }

    render() {
        let {title, num} = this.props.file

        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90w"
                backdrop={'static'}
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                    QC{num}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{title}</h4>
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer hidden={this.state.confirmUpdateOpen || this.state.confirmDeleteOpen}>
                    <Button variant="info" onClick={this.setUpdateConfirmation}>Save</Button>
                    <Button variant="danger" onClick={this.setDeleteConfirmation}>Delete</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                <Modal.Footer hidden={!this.state.confirmUpdateOpen}>
                    Are you sure you want to save updates to this QC File?
                    <Button variant="outline-success" onClick={this.onClickUpdate} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickUpdate} value="no">No</Button>
                </Modal.Footer>

                <Modal.Footer hidden={!this.state.confirmDeleteOpen}>
                    Are you sure you want to delete this QC File?
                    <Button variant="outline-success" onClick={this.onClickDelete} value="yes">Yes</Button>
                    <Button variant="outline-danger" onClick={this.onClickDelete} value="no">No</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}