import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import Nav  from '../../components/Nav'


const EditPost = () => {
    const location = useLocation()
    let history = useHistory()
    const { blogEntry } = useContext(UserContext)
    const [ post, setPost ] = useState({
        title: '', body:''
    })
    const param = location.pathname.split("/edit/")[1]

    useEffect(() => {
        axios({
            method:"GET",
            url:`/blog/${param}`,
            data: param
        }).then(x => {
            setPost(x.data);
        }).catch(e => console.log(e))
    }, [blogEntry._id, param])

    const handleChange =() =>{
        axios({
            method:"PATCH",
            url:`/blog/edit/${param}`,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            data: post
        }).then(x => {
            history.push(`/blog/${x.data._id}`)
        })
        .catch(err => console.log(err))
    }

    const handleTitle = (e) => {
        setPost({...post, title: e.target.value})
    }
    const handleBody = (e) => {
        setPost({...post, body: e.target.value})
    }
    return (
        <div>
            <Nav/>
            <form className="post-container" autoComplete="false">
                <h1 id="title">Edit Post!</h1>
                <TextField 
                    variant="outlined" 
                    placeholder="Title" 
                    type="text"
                    fullWidth="true"
                    value={post.title}
                    onChange={handleTitle}
                />
                <br />
                <TextField 
                    multiline
                    variant="outlined" 
                    placeholder="Text" 
                    value={post.body}
                    fullWidth="true"
                    onChange={handleBody}
                />
                <br />
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleChange}
                >
                    Submit Change
                </Button>
            </form>
        </div>
    )
}

export default EditPost
