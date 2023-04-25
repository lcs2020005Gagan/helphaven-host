import React, { useEffect, useState } from 'react'
import HomePageCard from './HomePageCard'
import NavBar from './NavBar'
import NoContent from './NoContent'
import RightNavBar from './RightNavBar'
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import SuccessAlert from './SuccessAlert'
import { useNavigate } from 'react-router-dom'
import Drawer from './Drawer'
function HomePage() {
  var rand=0
  const host="http://localhost:5000"
  const [user,setUser]=useState([])
  const navigate=useNavigate()
  const [articles,setArticles]=useState([])
  useEffect(() => {

    const func=async()=>{
      const response=await fetch(`${host}/api/upload/getallcards`,{
          method: 'GET',
        });
        const json=await response.json();
        setArticles(json);         
      }
      const getUserProfile=async ()=>{
        const response=await fetch(`${host}/api/auth/getuser2`,{
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token'),
              'Content-Type':'application/json'
            },
          });
    
          const json=await response.json();
         setUser((json[0]))
        }
        getUserProfile();
      func();
  }, [])


  const handleExport = () => {
    // create a workbook object
    const wb = XLSX.utils.book_new();

    // create a worksheet with some data
    const ws = XLSX.utils.json_to_sheet([
      {'age':35,'workclass':"Self-emp-inc",'education_level':"Bachelors",'education-num':13.0,'marital-status':"Married-civ-spouse",
      'occupation':'Exec-managerial','relationship':"Husband",'race':"White",'sex':'Male','capital-gain':0.0,'capital-loss':0.0,
      'hours-per-week':60.0,'native-country':"United-States",'greater_than_50k':0
 }
    ]);

    // add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // save the workbook as an Excel file
    XLSX.writeFile(wb, 'data.xlsx');
  };

  return (

       <div className="HomePage">
        <div className="RightAndLeft">
        <NavBar title={"Home"}/>
        <div className="HomePageCardsContainer">

        {articles&&user&&articles.map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <HomePageCard element={element} bookmarks={user.bookmarkedCards} upvotes={user.likedCards}/>
    </div>
})}
        </div>
{articles&&articles.length===0&&<NoContent NoContentTitle="No Posts to view" NoContentMessage="Please check back later"/>}
        </div>
        {/* <RightNavBar/> */}
       </div>
    )
}

export default HomePage