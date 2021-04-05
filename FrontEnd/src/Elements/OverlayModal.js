import { Modal } from 'react-bootstrap'
import React from 'react'

export default function OverlayModal(props) {
    return (
        <div>
            <Modal className="csModal" show={props.show} onHide={props.onClose} centered>
                <Modal.Header closeButton>
                    <h1 className="csHeaderBranding">BlogSite</h1>
                    <h4 className="csHeaderTitle">
                        { props.title }
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    { props.render }
                </Modal.Body>
            </Modal>
        </div>
    )
}
