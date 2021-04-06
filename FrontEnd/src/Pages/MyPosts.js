import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useData } from '../DataContext'
import AddPostForm from '../Elements/AddPostForm';
import MyPostCard from '../Elements/MyPostCard';
import OverlayModal from '../Elements/OverlayModal';
import axiosInstance from '../utils/Api';


export default function MyPosts() {
    const { userDetails } = useData()
    const [myPosts, setMyPosts] = useState([])
    const [addFormVisible, setAddFormVisible] = useState(false)

    useEffect(() => {
        axiosInstance.get("/posts", {
            userId: userDetails.userId
        })
        .then((response) => {
            if (!response.data.success) return 
            setMyPosts(response.data.data)
        })
        .catch(err => {
            console.log("Err ", err)
        })
    }, [])

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <h2>My Posts</h2>
                </Col>
                <Col style={{ textAlign: "right" }} sm={6}>
                    <button onClick={() => setAddFormVisible(true)} className="csButton csPostsButton">Add New</button>
                </Col>
            </Row>
            <Row>
                {
                    myPosts.map((myPost) => <Col sm={12}><MyPostCard post={myPost} /></Col>)
                }
            </Row>
            <OverlayModal show={addFormVisible} onClose={()=> setAddFormVisible(false)} render={<AddPostForm closeModal={()=> setAddFormVisible(false)} />} />
        </Container>
    )
}
