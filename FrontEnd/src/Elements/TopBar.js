import React, { useState } from 'react'
import { Nav, Container, Row, Col, Dropdown } from 'react-bootstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import profilePlaceholder from '../assets/Profile.svg'
import OverlayModal from './OverlayModal'
import { useData, useDataUpdate } from '../DataContext'
import { Link, useHistory } from 'react-router-dom'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      className="csCustomToggleLink"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

export default function TopBar() {
    const history = useHistory()

    const dataUpdaterContext = useDataUpdate()

    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)

    const { userDetails } = useData()

    const handleMenuEvent = (eventKey, e) => {
        if(eventKey === 'logout'){
            localStorage.removeItem("token")
            history.push('/')
            dataUpdaterContext.setUserDetails({ loggedIn: false})
            return
        }

        history.push(eventKey)
    }
    

    return (
        <div>
            <Nav className="csNavBar">
                <Container>
                    <Row>
                        <Col className="csLeftBox" sm={6}>
                            BlogSite
                        </Col>
                        <Col className="csRightBox" sm={6}>

                        {
                            userDetails.loggedIn 
                                ? (<>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} className="csNavMenuButton" id="dropdown-basic">        
                                        <div className="csNavProfileInfo">
                                            {/* <img src={ userDetails.userDetails.profilePicture ? userDetails.userDetails.profilePicture : profilePlaceholder } /> */}
                                            <img src={ profilePlaceholder } />
                                            <div className="csNavProfileName">
                                                {userDetails.userDetails.firstName}
                                            </div>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={handleMenuEvent} eventKey="/">All Posts</Dropdown.Item>
                                        <Dropdown.Item onSelect={handleMenuEvent} eventKey="/myposts">My Posts</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onSelect={handleMenuEvent} eventKey="logout">Log Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </>)
                                : <>
                                    <button onClick={()=> setRegisterVisible(true)}>Register</button>
                                    <button onClick={()=> setLoginVisible(true)}>Login</button>
                                </>
                        }
                            
                        </Col>
                    </Row>
                    <OverlayModal showHeader={true} title="Login" show={loginVisible} onClose={()=> setLoginVisible(false)} render={<LoginForm closeModal={()=> setLoginVisible(false)} />} />
                    <OverlayModal showHeader={true} title="Register" show={registerVisible} onClose={()=> setRegisterVisible(false)} render={<RegisterForm  closeModal={()=> setRegisterVisible(false)} />} />
                </Container>
            </Nav>
        </div>
    )
}
