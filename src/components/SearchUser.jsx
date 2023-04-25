import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
 
function SearchUser(props) {
  //  const ="";
    const [inputtedText,setText] = useState('');
const [List, setList] = useState([]);
// the list will have name and url
const handleSearch = async (event) => {
  
  await setText(event.target.value);
console.log(event.target.value)
  //console.log(`https://localhost:5000/api/people?search=${inputtedText}`);
  
  
  const response = axios.get(`http://localhost:5000/api/people?search=${event.target.value}`).then((response) => {
   // const arr=response.data
    //console.log(response.data);
    // if(event.target.value==="")
    // {
    //   setList([])
    // }
    // else
    setList(response.data)
  });
   
    
};
// const handleClick=  async(event) =>{
// console.log('Item clicked:', event.target.innerText);
// }
// useEffect(()=>{  

//   const handleSearchSubmit = async (event) => {
    
//     event.preventDefault();
//     // Make a request to the server to retrieve search results
//     console.log("response.data");
//      const response = await axios.get(`/api/people?search=${inputtedText}`);
//      //right now the data only contains name
//      console.log("response.data");
//      setList(response.data);
   
//   },[inputtedText];}


  return (
    <>
    <div className='SearchBar'  >
    <input type="text" className='SearchBox ' onChange={handleSearch}  placeholder='Search For User...' />
    <div className="SearchIcon hoverEffects">
      <AiOutlineSearch/>
    </div>
  

  </div>
   <ul className="user-list" style={{ display: 'flex', flexDirection: 'column' }}>
   {List.map((person) => (
     <li className="user-item" onClick={(event)=>{
      //console.log(props.receiver);
      console.log("setting receiver to" ,person._id)
      props.setReceiver( person._id)        
    }
      }>
      {person.name}
     </li>
   ))}
</ul>
</>
 )
}

export default SearchUser