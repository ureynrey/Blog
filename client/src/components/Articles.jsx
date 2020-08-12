import React, { useContext } from 'react'

import { UserContext } from '../context/UserContext'

import axios from 'axios'
import moment from 'moment'

import { Container } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const Articles = ({blogs}) => {
    let history = useHistory()
    const { setBlogEntry } = useContext(UserContext)

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
    
    React.useEffect( () => {
        console.log("Articles", blogs)
    },[])


    return (
        <div>
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
        </div>
    )
}

export default Articles
