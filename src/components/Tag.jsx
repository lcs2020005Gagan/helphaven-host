import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExploreCard from './ExploreCard'
import NoContent from './NoContent'
import NavBar from './NavBar'
import RightNavBar from './RightNavBar'
import { useParams } from 'react-router-dom'
import HomePageCard from './HomePageCard'

function Tag(props) {
    const host="http://localhost:5000"
    var rand=0
    var randd=0
    const params=useParams()
    const {tagId} =useParams();
    const [articles, setArticles] = useState(null)
    const [tags,setTags]=useState({})
    const [tagArticles,settagArticles]=useState([])
    const [loading, setLoading]=useState(true)    
    const [flag, setFlag]=useState(true)    
    const [resArr,setResArr]=useState([])
    useEffect(() => {
        const pushTags=async()=>{
            // if(flag===0)
            // setTags({})
            if(articles)
                for(let i=0;i<articles.length;i++)       
            {
                
                for(let j=0;j<articles[i].tags.length;j++)
                {    
                   if(tags.hasOwnProperty(articles[i].tags[j]))
                   {
                        tags[articles[i].tags[j]].push(articles[i])
                   }
                   else{
                    tags[articles[i].tags[j]]=[articles[i]]
                   }
                }
            }
        settagArticles([])        
        for(const key of Object.keys(tags))
        settagArticles( tagArticles => [...tagArticles, `${key}`]);
        // console.log(tags)
        // console.log(tags[tagId])
        setResArr([tags[tagId]])
        console.log("res array",resArr)
        setLoading(false);

        setFlag(0)
    }
    const func=async()=>{
        const response=await fetch(`${host}/api/upload/getallcards`,{
            method: 'GET',
        });
        const json=await response.json();
        setArticles(json);  
        pushTags();
    }        
    func();       
    },[loading])
  return (
    <>
    {loading?<NoContent/>:<div className='ProfileJs' >
            <NavBar title={`#${tagId}`}  />
            <div className="ok" style={{"display":"grid","gridTemplateColumns":"1fr 1fr"}}>

            {tags&&tags[tagId]&&tags[tagId].map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <HomePageCard element={element}/>
    </div>
})}
            </div>
    </div>}
    </>
  )
}

export default Tag