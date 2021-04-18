import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import moment from 'moment'
import axiosInstance from "../utils/Api";

import { useData, useDataUpdate } from "../DataContext";
import PostCard from '../Elements/PostCard';

export default function SinglePost() {
    const { posts } = useData();
    const { setPosts } = useDataUpdate();
    const [currentPost, setCurrentPost] = useState({});

    const { postId } = useParams();

    // Load Post from the BackEnd
    useEffect(() => {
        if(posts.length>0) return
        axiosInstance.get(`/posts`, {})
        .then((response) => {
            if (!response.data.success) return 
            setPosts(response.data.data)
        })
        .catch(err => {
            console.log("Err ", err)
        })
    }, [])

    // Load Post from Posts Array
    useEffect(() => {
        console.log("A")
        if(posts.length===0) return

        console.log("B", getCurrentPost(postId))
        setCurrentPost(getCurrentPost(postId))
    }, []);

    const getCurrentPost = (currentPostId) => {
        const post = posts.filter((p) => p._id === currentPostId);
        return post[0]
    }

      
    return (
        <div>
            <Container className="csSinglePostPage">
                <Row>
                    <Col sm={8}>
                        <img src={`${process.env.REACT_APP_API_URL}${currentPost?.featuredImage}`} />
                        <p className="csPostDate">Published {moment(currentPost?.postedOn).format('LL')}</p>
                        <h2>{currentPost?.title}</h2>
                        <p>{currentPost?.content}</p>
                    </Col>
                    <Col sm={4}>
                        {
                            posts.map(post => <PostCard post={post} fullWidth={false } />)    
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
