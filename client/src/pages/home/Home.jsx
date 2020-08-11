import React, { useState, useEffect, useContext } from 'react'
import { Container } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import Nav  from '../../components/Nav'
import Footer from '../../components/Footer'
import axios from 'axios'
import moment from 'moment'
import './home.css'

const Home = () => {
    const [ blogs, setBlogs ] = useState([])
    const { setBlogEntry } = useContext(UserContext)
    let history = useHistory()

    useEffect(()=> {
        axios({ 
            method: "GET",
            url:'/blog/all'
        }).then(x => { 
            setBlogs(x.data)        
        }
        ).catch(e => console.log(e.message))
    },[])

    function handlePostClick(id){
        axios({
            method:"GET",
            url:`/blog/${id}`,
            data: id
        }).then(x => {
            setBlogEntry(x.data)
            history.push(`/blog/${id}`)
        }).catch(e => console.log(e))
    }
    

    return (
        <div>
            <Nav />
            <h1 id="home-title">Blog Entries</h1>
            {blogs?.map((item,key) => (
            <div className="blog-container" key={`Main-${key}`}>
                <Container 
                    max-width="md" 
                    key={item._id}
                    onClick={() => handlePostClick(item._id)}
                    id="blog-post"
                >
                    <img 
                        src="https://picsum.photos/200/200"
                        className="blog-img"
                        alt={item.title}
                    />
                    <div className="blog-text">                    
                        <h1 className="blog-titles">{item.title}</h1>
                        <div className="blog-subText">
                            <div className="container-account" >
                                <AccountCircle />
                                <p>{item.author}</p>
                            </div>
                            <span id="vr"/>
                            <p>Posted: {moment(item.date).format('ll')}</p>
                        </div>
                        
                    </div>
                </Container>
            </div>
            ))}
            <Footer />

        </div>
    )
}

export default Home
