import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


import './App.css';
import Home from './pages/home/Home'
import BlogPost from './pages/blogPost/BlogPost'
import SignUp from './pages/logSign/SignUp'
import Login from './pages/logSign/Login'
import CreatePost from './pages/createPost/CreatePost'
import MyPost from './pages/authorPost/MyPost'
import EditPost from './pages/editPost/EditPost'
import SearchPage from './pages/searchPage/SearchPage'


import { UserContext } from './context/UserContext'

function App() {
  const { authorToken } = useContext(UserContext)
  
  return (
    <div>      
      <Router>
        <Switch>
          <Route path="/" exact   component={Home}        />
          <Route path="/blog/:id" component={BlogPost}    />
          <Route path="/search"   component={SearchPage}  />
          <Route path="/signUp"   component={SignUp}      />
          <Route path="/login"    component={Login}       />
          <Route path="/makePost" render={() => authorToken ? <CreatePost />  : <Home/>}/>
          <Route path="/mypost"   render={() => authorToken ? <MyPost/>       : <Home/>}/>
          <Route path="/edit/:id" render={() => authorToken ? <EditPost/>     : <Home/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
