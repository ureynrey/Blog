import React from 'react'
import './account.css'

const AccountNav = () => {
    return (
        <div id="account-nav">
            <h1>Settings</h1>
            <div id="account-nav-self">
                <img 
                    id="nav-image"
                    src="https://picsum.photos/100/100"
                    alt="Profile Image"
                />
                <div>
                    <h1>Name</h1>
                    <p>Display Name</p>
                </div>

                <div>
                    <h1>My Post</h1>
                    <h1>Account Setting</h1>
                    <h1>Log Out</h1>
                </div>
            </div>

        </div>
    )
}

export default AccountNav
