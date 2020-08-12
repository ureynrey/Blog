import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import './searchResults.css'
import Articles from '../../components/Articles'
import SearchBar from '../../components/SearchBar'

const SearchPage = ({location}) => {
    const [ articles, setArticles ] = useState([])

    useEffect( () => {
        let searchKey = location.search.split("=")[1]
        axios.get(`/blog/locate/${searchKey}`)
            .then(data => setArticles(data.data))
            .then(() => console.log("Test"))
    }, [])
    
    return (
    <div>
        <Nav />
        <div id="search-results">
            <SearchBar css="search-bar"/>
            { articles && <Articles blogs={articles}/> }
            <div id="search-category">
                <h1>Post Type</h1>
                <p>Add a Tag</p>
                <p>Add a Tag</p>
                <p>Add a Tag</p>

                <h1>Year</h1>
                <p>Add a Tag</p>
                <p>Add a Tag</p>
                <p>Add a Tag</p>

                <h1>Tags</h1>
                <p>Add a Tag</p>
                <p>Add a Tag</p>
                <p>Add a Tag</p>

            </div>
        </div>
    </div>
    )
}

export default SearchPage
