import { Modal, Spinner } from 'react-bootstrap'
import React from 'react'

export default function CustomLoader(props) {
    return (
        <div>
            <Modal className="csLoader" show={props.show} onHide={props.onClose} centered>
                <Modal.Body>
                    <Spinner animation="border" />
                </Modal.Body>
            </Modal>
        </div>
    )
}
