import React, { useContext, useEffect } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../context/UserContext'

import './nav.css'
import { useHistory } from 'react-router-dom'
import AuthorButton from './AuthorButton'
import LogOutButton from './LogOutButton'
import LoginButtons from './LoginButtons'

const navStyle = makeStyles({
    root: {
      height: 48,
      padding: '0 30px',
      display: 'flex',
      'flex-direction': 'row',
      'justify-content': 'space-around'
    }
});

const Nav = () => {
    let history = useHistory();
    const { setAuthorToken, token, authorToken, setToken } = useContext(UserContext)
    const nav = navStyle()

    useEffect(() => {
        if(token){
            setAuthorToken(() => localStorage.getItem('author'))
            setToken(() => localStorage.getItem('token'))
        }
    }, [token, setAuthorToken, setToken])

    return (
        <div>
        <AppBar position="static">
        <Toolbar className={nav.root} variant="dense">
            <Typography 
                variant="h6" 
                noWrap
                onClick={() => history.push('/')}
            >
                    BlogMe.com
            </Typography>
                {/* Handles Login Button Renders*/}
                { Boolean(!token)    ?  <LoginButtons /> : '' }
                { (Boolean(authorToken)  && token)?  <AuthorButton/>  : '' }
                { (Boolean(!authorToken) && token) ?   <LogOutButton />: '' }
        </Toolbar>
        </AppBar>
        </div>
    )
}

export default Nav
