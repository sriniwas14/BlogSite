import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import moment from 'moment'

import axiosInstance from "../utils/Api";

import CustomLoader from '../Elements/CustomLoader';
import { useData, useDataUpdate } from "../DataContext";
import PostCard from '../Elements/PostCard';

export default function SinglePost() {
    const { posts } = useData();
    const { setPosts } = useDataUpdate();
    const [currentPost, setCurrentPost] = useState({});
    const [storedState, setStoredState] = useState(EditorState.createEmpty())

    const [loading, setLoading] = useState(false)

    const { postId } = useParams();

    // Load Post from the BackEnd
    useEffect(() => {
        if(posts.length>0) return
        setLoading(true)
        axiosInstance.get(`/posts`, {})
        .then((response) => {
            if (!response.data.success) return 
            setPosts(response.data.data)
            setLoading(false)
        })
        .catch(err => {
            console.log("Err ", err)
            setLoading(false)
        })
    }, [])

    // Load Post from Posts Array
    useEffect(() => {
        console.log("A")
        if(posts.length===0) return

        console.log("B", getCurrentPost(postId))
        setCurrentPost(getCurrentPost(postId))
    }, [posts, postId]);

    useEffect(() => {
        if(Object.keys(currentPost).length===0 || currentPost.content.length===0) return
        console.log("Current Post", convertFromRaw(JSON.parse(currentPost.content)))
        const content = convertFromRaw(JSON.parse(currentPost.content))
        console.log("EMpty State", EditorState.createEmpty())
        setStoredState(EditorState.createWithContent(content))
    }, [currentPost])

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
          <Editor
            editorState={storedState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            readOnly={true}
            toolbarHidden={true}
            onEditorStateChange={(eState) => null }
          />
                    </Col>
                    <Col sm={4}>
                        {
                            posts.map(post => <PostCard post={post} fullWidth={false } />)    
                        }
                    </Col>
                </Row>
            </Container>
            <CustomLoader show={loading} />
        </div>
    )
}
