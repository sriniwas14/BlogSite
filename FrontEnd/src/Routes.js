import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import Home from "./Pages/Home"
import SinglePost from "./Pages/SinglePost"
import MyPosts from "./Pages/MyPosts"
import EditPost from "./Pages/EditPost"
import TopBar from './Elements/TopBar';

export default function Routes() {
    return (
        <Router>
            <TopBar />
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/posts/:postId"><SinglePost /></Route>
                <Route exact path="/myposts"><MyPosts /></Route>
                <Route path="/myposts/:postId"><EditPost /></Route>
            </Switch>
        </Router>
    )
}
