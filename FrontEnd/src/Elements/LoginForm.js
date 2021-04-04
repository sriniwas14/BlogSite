import React from 'react'

export default function LoginForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input className="csInput csText" placeholder="Username" type="email" name="username" required/>
            <input className="csInput csText" placeholder="Password" type="password" name="password" required/>
            <button className="csInput csButton">Login</button>
        </form>
    )
}
