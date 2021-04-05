import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { useDataUpdate } from '../DataContext';
import axiosInstance from '../utils/Api';

export default function LoginForm({ closeModal }) {
    const dataUpdaterContext = useDataUpdate()
    const [error, setError] = useState("")

    const handleSuccess = (token) => {
        const decodedToken = jwtDecode(token)
        dataUpdaterContext.setUserDetails({ loggedIn: true, userDetails: decodedToken })
        localStorage.setItem("token", token)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post('/users/login', {
            username: e.target.username.value,
            password: e.target.password.value
        }).then((response) => {
            if(!response.data.success) return setError(response.data.err)
            handleSuccess(response.data.token)
            closeModal()
        }).catch((err) => {
            console.log("Err ", err)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="csInput csText" placeholder="Username" type="email" name="username" required/>
            <input className="csInput csText" placeholder="Password" type="password" name="password" required/>
            {
                error.length>0 ? (
                    <Alert className="csFormError" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>
                ): null
            }
            <button className="csInput csButton">Login</button>
        </form>
    )
}
