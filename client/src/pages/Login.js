import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-type' : 'application/json'
            }
        })

        const json = await response.json()

        if(response.ok){
            sessionStorage.setItem('token', await json.token)
            navigate('/', {replace: true})
            window.location.reload()
        }

        console.log(sessionStorage.getItem('token'))
    }

    return(
        <div className='login'>
            <h2>Login</h2>            
            <form onSubmit = {handleSubmit}>
                <input
                type = 'email'
                className='form-input'
                id = 'email'
                name = 'email'
                value = {email}
                placeholder = 'Enter email'
                onChange = {(e) => {setEmail(e.target.value)}}
                />
                <input 
                type = 'password'
                className='form-input'
                id = 'password'
                value = {password}
                placeholder = 'Enter password'
                onChange = {(e) => {setPassword(e.target.value)}}
                />
                <input type = 'submit' value = 'Login' />
            </form>
        </div>
    )
}