import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useData, useDataUpdate } from '../DataContext'
import CustomLoader from '../Elements/CustomLoader';
import PostCard from '../Elements/PostCard'
import axiosInstance from '../utils/Api';

export default function Home() {
    const dataContext = useData()
    const dataUpdaterContext = useDataUpdate()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosInstance.get("/posts")
            .then((response) => {
                if (!response.data.success) return 
                dataUpdaterContext.setPosts(response.data.data)
                setLoading(false)
            })
            .catch(err => {
                console.log("Err ", err)
                setLoading(false)
            })
    }, [])

    if(dataContext.posts.length === 0) return (<></>) 

    return (
        <Container>
            <Row>
                <Col sm={12}><PostCard post={dataContext.posts[0]} fullWidth={true}/></Col>
            </Row>
            <Row>
            {dataContext.posts.map(post => <Col md={6} key={post._id}><PostCard post={post} fullWidth={false } /></Col>)}
            </Row>
            <CustomLoader show={loading} />
        </Container>
    )
}
