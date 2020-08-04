import React, { useContext } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import Nav  from '../../components/Nav'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

import './signUp.css'
import axios from 'axios'

const Login = () => {
    let history = useHistory()
    const { userAccount, setUserAccount, setAuthorToken, setToken } = useContext(UserContext)

    const handleLogin = () => {
        axios.post('/user/login', { ...userAccount })
            .then( x => {
                localStorage.setItem('token', x.data.token);
                localStorage.setItem('author', x.data.user.author)
                setAuthorToken(x.data.user.token)
                setToken(x.data.token)
                setUserAccount({...userAccount, password: '', email: ''})
                history.push('/')
            })
            .catch(e => console.error(e))
    }

    return (
        <div>
        <Nav />
        <Paper>
        Log In
        <form autoComplete="off" onSubmit={handleLogin} className="signUp-form">
            <TextField 
            id="signUp-email"
            variant="filled"
            label="Email"
            onChange={(e) => setUserAccount({...userAccount, email: e.target.value})}
            />
            <TextField 
            id="signUp-password"
            variant="filled"
            label="Password"
            type="password"
            onChange={(e) => setUserAccount({...userAccount, password: e.target.value})}
            />
            <Button
                id="signUp-btn"
                onClick={handleLogin}
            >
                Login</Button>
        </form>
        </Paper>
        </div>
    )
}

export default Login
