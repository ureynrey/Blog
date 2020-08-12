import React, { useState, useEffect } from 'react'

import Nav  from '../../components/Nav'
import Footer from '../../components/Footer'
import axios from 'axios'
import './home.css'
import Articles from '../../components/Articles'

const Home = () => {
    const [ blogs, setBlogs ] = useState([])

    useEffect(()=> {
        axios({ 
            method: "GET",
            url:'/blog/all'
        }).then(x => { 
            setBlogs(x.data)        
        }
        ).catch(e => console.log(e.message))
    },[])


    return (
        <div>
            <Nav />
            <h1 id="home-title">Blog Entries</h1>
            <Articles blogs={blogs}/>
            <Footer />

        </div>
    )
}

export default Home
