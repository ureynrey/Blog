import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { StyleContext } from '../context/StyleContext'
import { UserContext } from '../context/UserContext'

const LogOutButton = () => {
    const { setToken, setAuthorToken } = useContext(UserContext)
    const { buttonsStyle } = useContext(StyleContext)
    const btn = buttonsStyle()

    return (
        <div>
            <Button 
                className={btn.root}
                onClick={() => {
                    localStorage.removeItem('token'); 
                    localStorage.removeItem('author');
                    setToken(false)
                    setAuthorToken(false)
                }}
            >
                Log out
            </Button>
        </div>
    )
}

export default LogOutButton
