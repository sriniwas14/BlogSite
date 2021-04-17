import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import moment from 'moment'

import { useData } from "../DataContext";
import PostCard from '../Elements/PostCard';

export default function SinglePost() {
    const { posts } = useData();
    const [currentPost, setCurrentPost] = useState({});

    const { postId } = useParams();

    useEffect(() => {
        const post = posts.filter((p) => p._id === postId);
        setCurrentPost(post[0]);
    }, []);

      
    return (
        <div>
            <Container className="csSinglePostPage">
                <Row>
                    <Col sm={8}>
                        <img src={`${process.env.REACT_APP_API_URL}${currentPost.featuredImage}`} />
                        <p className="csPostDate">Published {moment(currentPost.postedOn).format('LL')}</p>
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
