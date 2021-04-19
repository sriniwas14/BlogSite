import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import { useParams } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import axiosInstance from "../utils/Api";
import { useData } from "../DataContext";


export default function EditPost() {
  const { posts } = useData();

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const { postId } = useParams();

  const [currentPost, setCurrentPost] = useState({});
  const [loading, setLoading] = useState(false);

  // Load Post from Post Array
  useEffect(() => {
    if(posts.length===0) return
    const post = posts.filter((p) => p._id === postId);
    setCurrentPost(post[0]);
  }, []);

  // Load Post from Database
  useEffect(() => {
    if(posts.length>0) return
    axiosInstance.get(`/posts/${postId}`, {})
    .then((response) => {
        if (!response.data.success) return 
        setCurrentPost(response.data.data)
    })
    .catch(err => {
        console.log("Err ", err)
    })
  }, [])


  useEffect(() => {
    if(Object.keys(currentPost).length===0 || currentPost.content.length===0) return
    const content = convertFromRaw(JSON.parse(currentPost.content))
    setEditorState(EditorState.createWithContent(content))
  }, [currentPost])

  const handleChange = (e) => {
    setCurrentPost((post) => ({ ...post, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setLoading(true);
    currentPost.content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    currentPost.content = currentPost.content.replace(/\//g, '')
    
    axiosInstance
      .put(`/posts`, {
        ...currentPost,
      })
      .then((response) => {
        if (!response.data.success) return;
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err ", err);
      });
  };

  const onDrop = (picture) => {
    if(picture.length===0) return 
    const formData = new FormData();
    formData.append("featured", picture[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axiosInstance
      .post(`/posts/${postId}/upload`, formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      })
      .catch((error) => {
        console.log("Err ", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <h2>Edit Post</h2>
        </Col>
        <Col style={{ textAlign: "right" }} sm={6}>
          {loading && (
            <div style={{ padding: 10, display: "inline" }}>
              <Spinner style={{ height: 21, width: 21 }} animation="border" />
            </div>
          )}
          <button className="csButton csPostsButton" onClick={handleSave}>Save</button>
          <button
            style={{ marginLeft: 5, backgroundColor: "#ff4734" }}
            onClick={() => window.history.back()}
            className="csButton csPostsButton"
          >
            Quit
          </button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={12}>
          <h3>Title</h3>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={currentPost?.title}
            placeholder="Title"
            className="csInput"
          />
        </Col>
        <Col sm={12}>
          <h3>Excerpt</h3>
          <textarea
            onChange={handleChange}
            name="excerpt"
            value={currentPost?.excerpt}
            placeholder="Excerpt"
            className="csInput"
          />
        </Col>
        <Col sm={12}>
          <h3>Featured Image</h3>
          <ImageUploader
            withPreview={true}
            singleImage={true}
            defaultImages={ [`${process.env.REACT_APP_API_URL}${currentPost.featuredImage}`]}
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg"]}
            maxFileSize={5242880}
          />
        </Col>
        <Col sm={12}>
          <h3>Content</h3>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="editorWrapper"
            editorClassName="editorContentArea"
            onEditorStateChange={(eState) => setEditorState(eState)}
          />
        </Col>
      </Row>
    </Container>
  );
}
