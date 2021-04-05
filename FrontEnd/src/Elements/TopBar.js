import React, { useState } from 'react'
import { Nav, Container, Row, Col } from 'react-bootstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import OverlayModal from './OverlayModal'

export default function TopBar() {
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)

    return (
        <div>
            <Nav className="csNavBar">
                <Container>
                    <Row>
                        <Col className="csLeftBox" sm={6}>
                            BlogSite
                        </Col>
                        <Col className="csRightBox" sm={6}>
                            <button onClick={()=> setRegisterVisible(true)}>Register</button>
                            <button onClick={()=> setLoginVisible(true)}>Login</button>
                        </Col>
                    </Row>
                </Container>
            </Nav>
            <OverlayModal title="Login" show={loginVisible} onClose={()=> setLoginVisible(false)} render={<LoginForm closeModal={()=> setLoginVisible(false)} />} />
            <OverlayModal title="Register" show={registerVisible} onClose={()=> setRegisterVisible(false)} render={<RegisterForm  closeModal={()=> setRegisterVisible(false)} />} />
        </div>
    )
}
