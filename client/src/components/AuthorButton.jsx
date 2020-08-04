import React, {useContext} from 'react'
import { Button } from '@material-ui/core'
import './nav.css'
import { useHistory } from 'react-router-dom'
import { StyleContext } from '../context/StyleContext'
import { UserContext } from '../context/UserContext'



const AuthorButton = () => {
    let history = useHistory()
    const { setToken } = useContext(UserContext)
    const { buttonsStyle } = useContext(StyleContext)
    const btn = buttonsStyle()

    return (
        <div className="authBtn-container">
                <Button 
                    className={btn.root}
                    onClick={() => history.push('/makePost')}
                >
                    Make Post
                </Button> 
                <Button 
                    className={btn.root}
                    onClick={() => history.push('/mypost')}
                >
                    My Post
                </Button> 
                <Button 
                className={btn.root}
                onClick={() => {
                    localStorage.removeItem('token'); 
                    localStorage.removeItem('author');
                    setToken(false)
                }}
            >
                Log out
            </Button>
        </div>
    )
}

export default AuthorButton
