import React, { useEffect, useState } from 'react'
import TopTrendingCard from './TopTrendingCard'

function TopTrending() {
  var rand=0
  const host="http://localhost:5000"
  const [articles,setArticles]=useState([])
  useEffect(() => {
    const func=async()=>{
      const response=await fetch(`${host}/api/upload/gettopcards`,{
          method: 'GET',
        });
        const json=await response.json();
        setArticles(json);         
      }
      func();
      // console.log("toptrending",articles);
  }, [])
  return (
    <div className='TopTrending'>
        <div className="TopTrendingTitle">
            Top Donations
        </div>
        {articles&&articles.map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <TopTrendingCard element={element}/>
    </div>
})}
    </div>
  )
}

export default TopTrending