import React, { useContext } from 'react'
import { Paper, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import Nav  from '../../components/Nav'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

import './signUp.css'
import axios from 'axios'

const SignUp = () => {
    let history = useHistory()
    const { userAccount, setUserAccount, setAuthorToken } = useContext(UserContext)

    const handleRegistration = () => {
        axios.post('/user', { ...userAccount })
            .then( data => {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('author', data.data.user.isAuthor)
                setUserAccount({...userAccount, password: '', email: ''})
                setAuthorToken(data.data.user.isAuthor)
                history.push('/')
            })
            .catch(e => console.error(e))
    }

    return (
        <div>
        <Nav />
        <Paper>
        Sign Up
        <form autoComplete="off" onSubmit={handleRegistration} className="signUp-form">
            <TextField 
            id="signUp-fName"
            variant="filled"
            label="First Name"
            onChange={(e) => setUserAccount({...userAccount, firstName: e.target.value})}
            />
            <TextField 
            id="signUp-lName"
            variant="filled"
            label="Last Name"
            onChange={(e) => setUserAccount({...userAccount, lastName: e.target.value})}
            />
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
            <FormControlLabel
            value="isAuthor"
            control={
                <Checkbox color="primary" />
            }
            onChange={() => {
                setUserAccount({...userAccount, isAuthor: !userAccount.isAuthor}); 
            }}
            label="Would you like to register to become an author?"
            labelPlacement="end"
            />
            <Button
                id="signUp-btn"
                onClick={handleRegistration}
            >
                Submit</Button>
        </form>
        </Paper>
        </div>
    )
}

export default SignUp
