import React from 'react'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import profilePlaceholder from '../assets/Profile.svg'
import { Link } from 'react-router-dom'

export default function PostCard(props) {
    const post = props.post

    const formatDate = (date) => {
        return moment(date).format('LL')
    }

    return (
        <Link className="csCardLink" to={`/posts/${post._id}`}>
        <Row className="csPostCard">
            <Col md={props.fullWidth ? 8 : 12}>
                <img alt={post.excerpt} className="csPostImage" src={`${process.env.REACT_APP_API_URL}/uploads/featured/default.jpg`} style={{ width: "100%" }} />
            </Col>  
            <Col md={props.fullWidth ? 4 : 12}>
                <p className="csPostDate">Published {formatDate(post.postedOn)}</p>
                <h2 className="csPostTitle">{ post.title }</h2>
                <p className="csPostExcerpt">{ post.excerpt }</p>
                <div className="csPostUserInfoContainer">
                    <img alt={post.userInfo.firstName} className="csPostUserInfoProfilePic" src={ post.profilePicture ? post.profilePicture : profilePlaceholder } />
                    <div className="csPostUserInfo">
                        <p className="csPostUserInfoName">{ post.userInfo.firstName+" "+post.userInfo.lastName }</p>
                        <p className="csPostUserInfoRole">{ post.userInfo.role }</p>
                    </div>
                </div>
            </Col>
        </Row>
        </Link>
    )
}
