import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, InputBase, makeStyles} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import SearchIcon from '@material-ui/icons/Search';
// import { makeStyles } from '@material-ui/core/styles'
import './nav.css'

import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContext';

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
    const { useSearch, setUserSearch } = useContext(UserContext)
    const [ searchField, setSearchField ] = useState('')
    const nav = navStyle()



    const onChange = (e) => {
        e.preventDefault(); 
        setSearchField(e.target.value)
        axios.get(`/blog/locate/${e.target.value}`)
            .then(data => console.log(data))
            .catch(e => console.warn(e))
    } 

    const onSubmit = (e) => {

        e.preventDefault()
        console.log('Hello2')
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
                <MuiAccordion>
                    <form 
                        noValidate
                        id="search-input" 
                    >
                        <SearchIcon />
                        <InputBase 
                            placeholder="Search..."
                            onChange={e => onChange(e)}
                            onSubmit={e => onSubmit(e)}
                            />
                    </form>
                   
                </MuiAccordion>
                {/* Handles Login Button Renders*/}
            
                

        </Toolbar>
        </AppBar>
        <Toolbar />

        </div>
    )
}

export default Nav
