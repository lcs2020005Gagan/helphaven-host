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
import Tag from './components/Tag';
import Chat from './components/Chat';
import Friend from './components/Friend';
import {CometChat} from '@cometchat-pro/chat'
import axios from 'axios';
import MetaMask from './components/MetaMask';
import WalletCard from './components/WalletCard';
import Transaction from './components/Transaction';
import CreditCard from './components/CreditCard';
import CreditCardSuccess from './components/CreditCardSuccess';
import ProgressBar from './components/ProgressBar';

function App() {
    // const appID="235622dfa676fd97"
    // const region="US"
    // const appSetting=new CometChat.AppSettingBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    
    // // CometChat.init(appID,appSetting).then(
    // //     ()=>{
    // //         console.log("initialization complete")
    // //     },
    // //     error=>{
    // //         console.log("initialization failed")
    // //     }
    // // )
    const ser= {'age':[20],'workclass':["State-gov"],'education_level':["Bachelors"],'education-num':[13.0],'marital-status':["Never-married"],'occupation':[''],'relationship':["Not-in-family"],'race':["White"],'sex':['Female'],'capital-gain':[0.0],'capital-loss':[0.0],'hours-per-week':[40.0],'native-country':["United-States"]};


    const [message, setMessage] = useState('');
    const myString = 'lack kills time';
    
    useEffect(() => {
     

          axios.post('http://localhost:8001/api/post-data', {
            data: ser
          })
          .then(response => {
            console.log("income",response.data);
          })
          .catch(error => {
            console.log(error);
          });
        
          // axios.post('http://localhost:8000/api/post-data', {
          //   data: myString
          // })
          // .then(response => {
          //   console.log("sentiment",response.data);
          // })
          // .catch(error => {
          //   console.log(error);
          // });

      }, []);
     
      
    return (
        <BrowserRouter>
         {window.location.pathname==="/home"&&<div className="App">

       <Home/>
        </div>}
            
        {window.location.pathname!=="/home"&&<div className="HomePageContainer">
            <div className="LeftHomePageContainer">
                <LeftNavBar />
            </div>
            <div className="CenterHomePageContainer">

                <Routes>
                <Route exact path="/" element=<HomePage /> />
                <Route exact path="/friend" element=<Friend /> />
                <Route exact path="/chat" element=<Chat /> />
                <Route exact path="/tag/:tagId" element=<Tag /> />
                <Route exact path="/metamask" element=<MetaMask /> />
                <Route exact path="/explore/foru" element=<Explore toRender="ForYou" /> />
                <Route exact path="/explore/trending" element=<Explore toRender="Trending" /> />
                <Route exact path="/bookmarks" element=<BookMarks /> />
                <Route exact path="/profile/:profileId" element=<Profile toRender={"subscriptions"} /> />
                <Route exact path="/profile/:profileId/liked" element=<Profile toRender={"liked"} /> />
                <Route exact path="/profile/:profileId/bookmarked" element=<Profile toRender={"bookmarked"} /> />
                <Route exact path="/story/:storyId" element=<Story /> />
                <Route exact path="/creditcard" element=<CreditCard /> />
                <Route exact path="/creditcardsuccess" element=<CreditCardSuccess /> />
                <Route exact path="/progress" element=<ProgressBar /> />
                </Routes>
                {/* <div className="RightHomePageContainer">
        <RightNavBar/>
    </div> */}
            </div>

        </div>}
           </BrowserRouter>

    );
}

export default App;
