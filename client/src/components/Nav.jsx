import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './nav.css'

import { useHistory } from 'react-router-dom'

import SearchBar from './SearchBar'

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
    const nav = navStyle()
    const [ token, setToken ] = useState(localStorage.getItem('token') )

    useEffect( () => {
        console.log(Boolean(token) )
    })

    const handleAccount = () => {
        history.push('/account')
    }
  
    return (
        <div>
        <AppBar >
        <Toolbar className={nav.root} variant="dense">
            <Typography 
                variant="h6" 
                noWrap
                onClick={() => history.push('/')}
                style={{ cursor:"pointer"}}
            >
                    BlogMe.com
            </Typography>
            <SearchBar /> 
            { token && <button>Create Post</button> }
            { token && 
                <AccountCircleIcon 
                    id="account-button"
                    onClick={handleAccount}
            />}


        </Toolbar>
        </AppBar>
        <Toolbar />

        </div>
    )
}

export default Nav
