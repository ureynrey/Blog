if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 8080;
const moment = require('moment')

require('dotenv').config()
require('../database/mongoose')


const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');

app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/blog', blogRouter)

if(process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}




app.listen( port, () => {
    console.log(`Express server is up on port ${port}`)
})