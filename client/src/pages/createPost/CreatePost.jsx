import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import './createPost.css'
import axios from 'axios'
import Nav from '../../components/Nav'
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
    let history = useHistory();
    const [ post, setPost ] = useState({
        title: '', body:''
    })

    const createPost = () => {
        axios({
            method: 'POST',
            url: '/blog/new', 
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            data: {...post}
        })
        .then((x) => history.push(`/blog/${x.data._id}`))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <Nav />
            <form className="post-container" autoComplete="false">
                <h1 id="title">Make a Post!</h1>
                <TextField 
                    variant="outlined" 
                    placeholder="Title" 
                    fullWidth
                    onChange={(e) => {setPost({...post, title: e.target.value})}}
                />
                <br />
                <TextField 
                    multiline
                    variant="outlined" 
                    placeholder="Text" 
                    fullWidth
                    onChange={(e) => {setPost({...post, body: e.target.value})}}
                />
                <br />
                <Button 
                    variant="contained"
                    color="primary"
                    id="spacing"
                    onClick={() => createPost()}>
                    Create Entry!
                </Button>
                <p>P.S. You must be an author to make post ;^)</p>
            </form>
        </div>
    )
}

export default CreatePost
