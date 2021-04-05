import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useData } from '../DataContext'
import PostCard from '../Elements/PostCard'

export default function Home() {
    const dataContext = useData()

    return (
        <Container>
            <Row>
                <Col sm={12}><PostCard post={dataContext.posts[0]} fullWidth={true}/></Col>
            </Row>
            <Row>
            {dataContext.posts.map(post => <Col md={6} key={post._id}><PostCard post={post} fullWidth={false } /></Col>)}
            </Row>
        </Container>
    )
}
