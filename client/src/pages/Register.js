import React from 'react'
import { useState } from 'react'

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type' : 'application/json'
            },
        })

        const json = await response.json()
        if(response.ok){
            sessionStorage.setItem('token', await json.token)
        }

        if(!response.ok){
            setError(await json.message)
        }

        console.log(sessionStorage.getItem('token'))
    }

    return(
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
            <input
                type = 'name'
                className = 'form-input'
                id = 'name'
                name = 'name'
                value = {name}
                placeholder = 'Enter name'
                onChange = {(e) => {setName(e.target.value)}}
                />
                <input
                type = 'email'
                className = 'form-input'
                id = 'email'
                name = 'email'
                value = {email}
                placeholder = 'Enter email'
                onChange = {(e) => {setEmail(e.target.value)}}
                />
                <input
                type = 'password'
                className = 'form-input'
                id = 'password'
                name = 'password'
                value = {password}
                placeholder = 'Enter password'
                onChange = {(e) => {setPassword(e.target.value)}}
                />
                {error && <p className='error'>{error}</p>}
                <input type = 'submit' value = 'Register' />
            </form>
        </div>
    )
}