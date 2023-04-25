/* eslint-disable */

import React, {useState} from 'react';
// import  {ethers} from 'ethers';
import Axios from 'axios'; 
import ButtonComp from './ButtonComp';
import { useLocation, useNavigate } from 'react-router-dom';


const MetaMask = (props) => {
  const navigate=useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const profile = searchParams.get('authname');
  const profileimg = searchParams.get('authprofile');
  const image = searchParams.get('image');
  const cardId = searchParams.get('cardId');


  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null); 
  const [note, setnote] = useState({amount:0}); 

  const connectWallet = () => {
    try{
    if (window.ethereum) {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
        //   accountChanged([result[0]])
          const accountName=[result[0]]
          setDefaultAccount(accountName)
          window.ethereum.request({method: 'eth_getBalance', params: [String(accountName), "latest"]})
          .then(balance => {
              setUserBalance(ethers?.utils?.formatEther(balance));
              console.log("balance", balance)
          })
          console.log("result is",result)

        })
    } else {
      setErrorMessage('Install MetaMask please!!')
    }
  }
  catch(error){
    console.log(error)
  }
  }

  const handlechange=(e)=>{
    setnote({...note,   [e.target.name]:e.target.value})
  }
  const accountChanged = (accountName) => {
    try{
    setDefaultAccount(accountName)
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountName), "latest"]})
    .then(balance => {
        console.log("balance", balance)
      setUserBalance(ethers?.utils?.formatEther(balance));
      console.log(errorMessage,defaultAccount,userBalance)
    })
  }
  catch(error){
    console.log(error)
  }
  }

  const getUserBalance = (accountAddress) => {
    try{
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
    .then(balance => {
        console.log("balance", balance)
      setUserBalance(ethers?.utils?.formatEther(balance));
      console.log(errorMessage,defaultAccount,userBalance)
      
    })
  }
  catch(error){
    console.log(error)
  }
  }

  async function sendTransaction(e){
    try{
        let params=[{
        from :"0x6b13a2af774b317babd380590133d439cbfe7c6c",
        to:"0xa644b9c52b7a9093bb129001e7b162c18112f5c6",
        gas:Number(2100).toString(16),
        gasPrice:Number(2500000).toString(16),
        value:Number(note.amount*100000000).toString(16)
        }]

        let result=await window.ethereum.request({method:"eth_sendTransaction",params}).catch((err)=>{
            console.log(err)
        })
        console.log("after transaction is",result)
        const card_id=cardId
        const amountGiven=note.amount*170214 ;
          const response=await fetch("http://localhost:5000/api/auth/donate",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem("token")
                },
                body: JSON.stringify({card_id,amountGiven}),
              });
            const json=await response.json();
            console.log(json);
            if(json.user)
            {
              navigate(`/creditcardsuccess?authname=${profile}&authprofile=${profileimg}&cardId=${cardId}&source=metamask`);
            }
            else
            {
              alert("Couldn't process transaction")
            }
      }
      catch(error){
        console.log(error)
      }
  }

  return (
    <div className='Metamask'>
     {/* <h1>MetaMask Wallet Connection </h1>
        <button onClick={connectWallet}>Connect Wallet Button</button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance is:  {userBalance?userBalance:"nothing"}</h3>
        <h3>Enter Transaction Address: </h3>
        <input type="text" name="to_address" placeholder="Address: " />
        {errorMessage}
        <button onClick={sendTransaction}>send</button> */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAIGhgoYnRrLMWxlZp9ti6JnQ8lqgdbrS3-KoY4e5CwrCQ5mhgsd-y03fao6aGXaK5g44&usqp=CAU" alt="" />
        <div className="Ok" onClick={connectWallet} style={{"width":"15rem"}}>
          <ButtonComp title="Connect MetaMask Wallet" />
        </div>
        <div className="ok">
          <h1 style={{"color":"white"}}>
          {defaultAccount&&"Metamask Wallet connected successfully!"}
          {!defaultAccount&&"Connect your Metamask wallet to donate!"}
          </h1>
          <h5 style={{"color":"white"}}>

          {defaultAccount&&"Your Wallet Address is: "}
          </h5>
          <h6 style={{"color":"grey"}}>

          {defaultAccount}
          </h6>

        </div>
      {defaultAccount&&

          <input  className='SearchBox' label='Email address' id='form1' name='amount' type='text' onChange={handlechange} placeholder="Enter Etheureum (1 eth =  1,60,642 ₹)"/>}
                {defaultAccount&&<div className="ok" onClick={sendTransaction}  style={{"width":"7rem"}}>
          <ButtonComp title="Donate" />
        </div>}
    </div>

  )

}
export default MetaMask;