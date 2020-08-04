import React, { useEffect, useContext, useState } from 'react'
import Nav from '../../components/Nav'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import './mypost.css'

const MyPost = () => {
    let history = useHistory();
    const { authorEntries, setAuthorsEntries } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)
     
    useEffect( () => {
        axios.post('/blog/entries', { test: "test" }, 
            { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
        .then(x => setAuthorsEntries(x.data))
        .catch(e => console.log(e))
    }, [toggle, setAuthorsEntries])

    function handleDelete(id){
        axios.delete( `/blog/delete/${id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}} )
        .then(x => setToggle(!toggle))
        .catch(e => console.log(e))
    }
    function handleEdit(id){
        history.push(`/edit/${id}`)
    }

    return (
        <div>
            <Nav />
            {authorEntries?.map((item, key) => (
                <div className='post-container' key={`authorPost-${key}`}>
                    <h1 onClick={(e) => {
                        history.push(`/blog/${item._id}`)
                    }}>
                        {item.title}
                    </h1>
                    
                    <p>Comments: {item.comments.length} </p>
                    <div id='btn-container'> 
                        <Button 
                            variant="contained"
                            color="secondary"
                            style={{width:"100px", margin:"4px"}}
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </Button>
                        <Button 
                            variant="contained"
                            color="primary"
                            style={{width:"100px", margin:"4px"}}
                            onClick={() => handleEdit(item._id)}
                        >
                            Edit  
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyPost
