import React from 'react'

export default function RegisterForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
        <input className="csInput csText" placeholder="First Name" type="text" name="firstName" required/>
        <input className="csInput csText" placeholder="Last Name" type="text" name="lastName" required/>
            <input className="csInput csText" placeholder="E-Mail" type="email" name="username" required/>
            <input className="csInput csText" placeholder="Password" type="password" name="password" required/>
            <input className="csInput csText" placeholder="Confirm Password" type="password" name="confirmPassword" required/>
            <input className="csInput csText" placeholder="Profession" type="text" name="role" required/>
            <button className="csInput csButton">Register</button>
        </form>
    )
}
