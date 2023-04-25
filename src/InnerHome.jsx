import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LeftNavBar from './components/LeftNavBar';
import Profile from './components/Profile';
import Home from './components/Home'
import { useEffect, useState, useRef } from 'react';

import RightNavBar from './components/RightNavBar';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    BrowserRouter,
    Routes,
    useLocation,
} from "react-router-dom";
import Story from './components/Story';
import BookMarks from './components/BookMarks';
import Explore from './components/Explore';
function InnerHome() {
    return (
        // <BrowserRouter>
            
        <div className="HomePageContainer">
            <div className="LeftHomePageContainer">
                <LeftNavBar />
            </div>
            <div className="CenterHomePageContainer">
                {/* <Routes> */}
                <Route exact path="/home/home-page" element=<HomePage /> />
                <Route exact path="/explore/foru" element=<Explore toRender="ForYou" /> />
                <Route exact path="/explore/trending" element=<Explore toRender="Trending" /> />
                <Route exact path="/bookmarks" element=<BookMarks /> />
                <Route exact path="/profile/:profileId" element=<Profile toRender={"subscriptions"} /> />
                <Route exact path="/profile/:profileId/liked" element=<Profile toRender={"liked"} /> />
                <Route exact path="/profile/:profileId/bookmarked" element=<Profile toRender={"bookmarked"} /> />
                <Route exact path="/story/:storyId" element=<Story /> />
                {/* </Routes> */}
                {/* <div className="RightHomePageContainer">
        <RightNavBar/>
    </div> */}
            </div>

        </div>
        //    </BrowserRouter>

    );
}

export default InnerHome;
