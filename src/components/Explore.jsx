import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExploreCard from './ExploreCard'
import NoContent from './NoContent'
import NavBar from './NavBar'
import RightNavBar from './RightNavBar'

function Explore(props) {
    const host="http://localhost:5000"
    var rand=0
    var randd=0
    const [articles, setArticles] = useState(null)
    const [tags,setTags]=useState({})
    const [tagArticles,settagArticles]=useState([])
    const [loading, setLoading]=useState(true)    
    const [flag, setFlag]=useState(true)    
    const [tagsInfo,setTagsInfo]=useState({})
    useEffect(() => {
        const pushTags=async()=>{
            console.log("flag ",flag)
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
        console.log("tags",tags)
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
    {loading?<NoContent/>:<div className='ProfileJs'>
        <div className="rightAndLeft">
            <NavBar title="Explore"  toRender={props.toRender}/>
            {tagArticles&&tagArticles.map((element) => {
  return <div className="d-flex justify-content-center " key={randd} style={{"width":"100%","padding":"0","margin":"0"}}>
     <ExploreCard tag={element} tags={tags} rank={++randd} toRender={props.toRender}/>
  </div>
})}
  
        </div>
    </div>}
    </>
  )
}

export default Explore