import React, { useEffect,useState } from 'react'
import {BsDot} from 'react-icons/bs'
import {HiOutlineSparkles} from 'react-icons/hi'
import { Link } from 'react-router-dom'

function ExploreCard(props) {
    const [arr,setArr]=useState([])
    const arrSet=new Set()
    const [donations,setDonations]=useState(0)
    useEffect(() => {
    setArr(props.tags[props.tag]);
    // function removeDuplicates(arr) {
    //     return arr.filter((item,
    //         index) => arr.indexOf(item) === index);
    //     }
    //     setArr(removeDuplicates(arr))
    arr.forEach(element => {
        arrSet.add(element)
        setDonations(donations+element.priority)
    });
    // setArr([])
    // arrSet.forEach(element => {
    //     setArr( arr => [...arr, element]);
    // });
        console.log("rand array",arr)
        console.log("rand set",arrSet)
        console.log("rand set size",arrSet.size)
    }, [])
  return (
    <Link to={`/tag/${props.tag}`} style={{"width":"100%","color":"grey"}}>
    <div className='ExploreCard HoverEffectsBack'>
         {props.toRender==="Trending"&&<div className="ExploreCardDonationRequests">
                {props.rank}<BsDot/> Trending
            </div>}
         {props.toRender==="ForYou"&&<div className="ExploreCardDonationRequests">
                <HiOutlineSparkles style={{"color":"gold"}}/> Recommended
            </div>}
        <div className="ExploreCardTop">
            #{props.tag}
        </div>
        <div className="ExploreCardBottom">
            <div className="ExploreCardDonationRequests">
                {arr.length} requests <BsDot/>  {donations} donations
            </div>
        </div>
    </div>
    </Link>
  )
}

export default ExploreCard