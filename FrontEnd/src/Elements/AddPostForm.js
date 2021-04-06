import React from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../DataContext';
import axiosInstance from '../utils/Api';

export default function AddForm() {
    const { userDetails } = useData()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/posts",{
            title: e.target.title.value,
            excerpt: e.target.excerpt.value,
            createdBy: userDetails.userDetails._id
        }).then(response => {
            if(!response.data.success) return console.log("Something Went Wrong!")
            history.push(`/myposts/${response.data.data._id}`)
        }).catch(err => console.log("Err ", err))
    }
    return (
        <form onSubmit={handleSubmit}>
        <h3>Create New Post</h3>
        <input className="csInput csText" placeholder="Post Title" type="text" name="title" required/>
        <textarea className="csInput csText" placeholder="Excerpt" name="excerpt" required></textarea>
            <button className="csInput csButton">Create Post</button>
        </form>
    )
}
