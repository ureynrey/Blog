import React, { useState, useContext, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import Nav  from '../../components/Nav'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom' 
import { AccountCircle } from '@material-ui/icons'


import './blogPost.css'

const BlogPost = () => {
    let location = useLocation()
    const { blogEntry, setBlogEntry } = useContext(UserContext)
    const [comment, setComment] = useState({
        comment: '',
    })

    useEffect(() => {
        axios({
            method:"GET",
            url:`/blog/${location.pathname.split("/blog/")[1]}`,
            data: location.pathname.split("/blog/")[1]
        }).then(x => {
            setBlogEntry(x.data)
        }).catch(e => console.log(e))
    }, [blogEntry._id, location.pathname, setBlogEntry])

    const handleComment = () => {
        axios({
            method: "PATCH",
            url:`/blog/comment/${location.pathname.split("/blog/")[1]}`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            data: {comment: comment }
        }).then(x => setBlogEntry(x.data))
    }

    return (
        <>
        <Nav />
        <div id="entry-container">
            <h1>{blogEntry.title}</h1>
            <p><AccountCircle /> {blogEntry.author}   </p>
            <div id="entry-body">
                <img src="https://picsum.photos/200/300" alt="My favorite random article"/>
                <p id="entry-text">{blogEntry.body}</p>
            </div>
        <div>
        {blogEntry.comments?.map((item,key) => (
            <div className={`comment-${key%2} comment`} key={`comment-${key}`}>
                <p>{item.body}</p>
                <div className="comment-author">
                    <AccountCircle />
                    <p>{item.author}</p>
                </div>

            </div>
        ))}
            <TextField 
                style={{width:'80vw'}}
                variant='outlined'
                multiline
                placeholder='Write a comment :-)'
                onChange={(e) => setComment(e.target.value)}
            />
            <br/>
            <Button 
                variant="outlined"
                color="primary"
                onClick={() => handleComment()}>
                Post Comment
            </Button>
        </div>

        </div>
        </>
    )
}

export default BlogPost
