import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function MyPostCard({ post }) {
    return (
        <Link className="csMyPostLink" to={`/myposts/${post._id}`}>
        <div className="csMyPostCard">
                <Container>
                    <Row>
                        <Col sm={2}>
                            <img style={{ width: "100%" }} src={`${process.env.REACT_APP_API_URL}/uploads/featured/default.jpg`} />    
                        </Col>    
                        <Col className="csMPCDetails" sm={8}>
                            <h3>{ post.title }</h3>
                            <p>{ post.excerpt }</p>
                            <p className="csPostDate">Published {moment(post.postedOn).format('LL')}</p>
                        </Col>
                    </Row>
                </Container>
        </div>
        </Link>
    )
}
