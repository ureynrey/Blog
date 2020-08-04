import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { StyleContext } from '../context/StyleContext'

import { Button } from '@material-ui/core'
import './nav.css'

const LoginButtons = () => {
    let history = useHistory()
    const { buttonsStyle } = useContext(StyleContext)
    const btn = buttonsStyle()

    return (
        <div className="authBtn-container">
            <Button className={btn.root}
                    onClick={() => history.push('/logIn')}
            >
                Log In
            </Button>
            <Button 
                className={btn.root}
                onClick={() => history.push('/signUp')}
            >
                Sign Up
            </Button>
        </div>
    )
}

export default LoginButtons
