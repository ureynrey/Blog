import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext()

const UserContextProvider = (props) => {
    const [ userAccount, setUserAccount ] = useState({
        firstName: '',  lastName:'',
        email:'',   password:'',
        isAuthor: false
    })
    const [ authorEntries, setAuthorsEntries ] = useState([])
    const [ authorToken, setAuthorToken ] = useState(false)
    const [ blogEntry, setBlogEntry ] = useState({})
    const [ editBlogEntry, setEditBlogEntry ] = useState({})
    const [ token, setToken ] = useState(localStorage.getItem("token"))


    useEffect( () => {
        if(authorToken !== localStorage.getItem('author')){
            setAuthorToken(localStorage.getItem('author'))
        }
    }, [authorToken])

    return(
        <UserContext.Provider
            value={{
                userAccount, setUserAccount,
                authorEntries, setAuthorsEntries,
                authorToken, setAuthorToken,
                token, setToken,
                blogEntry, setBlogEntry,
                editBlogEntry, setEditBlogEntry
            }}
        >
            {props.children} 
        </UserContext.Provider>
    );
}

export { UserContextProvider }