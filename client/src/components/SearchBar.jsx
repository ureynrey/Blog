import React, { useContext, useState } from 'react'
import { InputBase } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { UserContext } from '../context/UserContext';

import { useHistory } from 'react-router-dom'

const SearchBar = ({css}) => {
    let history = useHistory();
    const { userSearch, setUserSearch } = useContext(UserContext)
    const [ searchField, setSearchField ] = useState('')

    const onChange = (e) => {
        e.preventDefault(); 
        setUserSearch(e.target.value)
        axios.get(`/blog/locate/${e.target.value}`)
            .then(data => console.log(data))
            .catch(e => console.warn(e))
    } 

    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?q=${userSearch}`)
    }

    return (
        <div id={css}>
            <MuiAccordion>
                    <form 
                        noValidate
                        onSubmit={e => onSubmit(e)}
                        id="search-input" 
                    >
                        <SearchIcon />
                        <InputBase 
                            placeholder="Search..."
                            style={{border: "1px solid black", width: "100%"}}
                            onChange={e => onChange(e)}
                            onSubmit={e => onSubmit(e)}
                            />
                    </form>
                   
                </MuiAccordion>
        </div>
    )
}

export default SearchBar
