import React from 'react'
import { Link } from 'react-router-dom'

export default function MyPostCard({ post }) {
    return (
        <div>
            <Link to={`/myposts/${post._id}`}>
            { post.title }</Link>
        </div>
    )
}
