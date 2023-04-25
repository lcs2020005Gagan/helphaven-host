import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaShareAlt } from 'react-icons/fa'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { TagsInput } from 'react-tag-input-component'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ButtonComp from './ButtonComp';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Payment from 'payment';
import { useLocation } from 'react-router-dom';

function CreditCard(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const profile = searchParams.get('authname');
  const profileimg = searchParams.get('authprofile');
  const image = searchParams.get('image');
  const cardId = searchParams.get('cardId');
  
  const navigate=useNavigate();
    const [Country, setCountry] = useState(""); // the selected country
    const [note,setNote]=useState({
      amount:"",
      email:"",
      creditcardnumber:"",
      monthyear:"",
      cvv:"",
      nameoncard:"",
      country:""
    })
    const handleChangeCountry= (event) => {
      setCountry(event.target.value);
  };
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
    const handlechange=(e)=>{
      setNote({...note,   [e.target.name]:e.target.value})
    }
    const validate = () => {
      // Amount validation
      
      if (note.amount <= 0) {
        alert('Amount must be greater than 0');
        return false;
      }
      if(isNaN(note.amount)||isNaN(parseFloat(note.amount))){
        alert('Please enter a valid amount');
        return false;
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(note.email)) {
        alert('Please enter a valid email address');
        return false;
      }
  
      // Card number validation
      const cardNumberRegex = /^(?:[0-9]{4}[ -]?){3}[0-9]{4}$/;
      if (!cardNumberRegex.test(note.creditcardnumber)) {
        alert('Please enter a valid card number');
        return false;
      }
  
      // Expiry validation
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!expiryRegex.test(note.monthyear)) {
        alert('Please enter a valid expiry date in MM/YY format');
        return false;
      }
  
      // CVV validation
      const cvvRegex = /^[0-9]{3}$/;
      if (!cvvRegex.test(note.cvv)) {
        alert('Please enter a valid CVV number');
        return false;
      }
  
      // Name on card validation
      if (note.nameoncard.length < 3) {
        alert('Please enter a valid name on card');
        return false;
      }
  

  
      return true;
    };
    const handlePay=async()=>{
      note.country=Country
      console.log(note)
      if(validate())
      {
        const card_id=cardId
        const amountGiven=Number(note.amount)
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
              navigate(`/creditcardsuccess?authname=${profile}&authprofile=${profileimg}&cardId=${cardId}&source=creditcard`);
          }
            else
            {
              alert("Couldn't process transaction")
            }
      }
    }
  return (
    <div className='CreditCard'>
      
        <div className="CreditCardLeft">
            <h1>Donate to:</h1>
            <h4>
                "{title}"
            </h4>
            <img src={image} alt="" />
        </div>
        <div className="CreditCardRight">
          
            <h1>Pay with card</h1>
            <div className="CreditCardForm">
            <div className="CreditCardInput">
            <h6>Enter amount:</h6>
            <input  className='SearchBox' label='Amount' id='form23' type='text' name='amount' onChange={handlechange} placeholder=""/>
            </div>
            <div className="CreditCardInput">
            <h6>Email:</h6>
            <input  className='SearchBox' label='Password' id='form2' type='text' name='email' onChange={handlechange}placeholder=""/>
            </div>
            <div className="CreditCardInput">
            <h6>Card Information:</h6>
            <div className="CreditCardNumber">
            <input  className='SearchBox' label='Password' id='form232' type='text' name='creditcardnumber' onChange={handlechange}placeholder="1234 1234 1234 1234"/>
            <div className='logopayment'>
            <img src="https://cdn.shopify.com/s/files/1/1708/8567/products/currenthorizcreditcardPOS_511x128.gif?v=1484599034" alt="" />
            </div>

            </div>
            <div className="CreditCardNumber" style={{"gap":"0.5rem"}}>
            <input  className='SearchBox' label='Password' id='form22342' type='text' name='monthyear' onChange={handlechange}placeholder="MM/YY"/>
            <input  className='SearchBox' label='Password' id='form204534534' type='text' name='cvv' onChange={handlechange}placeholder="CVV"/>
            </div>
            </div>
            <div className="CreditCardInput">
            <h6>Name on card:</h6>
            <input  className='SearchBox' label='Password' id='form234232' type='text' name='nameoncard' onChange={handlechange}placeholder=""/>
            </div>
      

            <div className="CreditCardInput">
            <ThemeProvider theme={darkTheme}>
            <h6>Country or region:</h6>
            <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Country}
          onChange={handleChangeCountry}
          autoWidth
          label="Country"
          className='SearchBox'
          style={{"height":"3.5rem"}}
        >         
{['Cambodia', 'Canada', 'China', 'Columbia', 'Cuba', 'Dominican-Republic', 'Ecuador', 'El-Salvador', 'England', 'France', 'Germany', 'Greece', 'Guatemala', 'Haiti', 'Holand-Netherlands', 'Honduras', 'Hong', 'Hungary', 'India', 'Iran', 'Ireland', 'Italy', 'Jamaica', 'Japan', 'Laos', 'Mexico', 'Nicaragua', 'Outlying-US(Guam-USVI-etc)', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto-Rico', 'Scotland', 'South', 'Taiwan', 'Thailand', 'Trinadad&Tobago', 'United-States', 'Vietnam', 'Yugoslavia'].map(country => (
  <MenuItem value={country} key={country}>{country}</MenuItem>
))}    </Select>

      </FormControl>
            </ThemeProvider>
            </div>
            <div className="CreditCardInput" style={{"width":"7rem","display":"flex","marginRight":"auto","marginLeft":"auto"}} onClick={handlePay}>
              <ButtonComp title="Pay"/>
            </div>
            </div>
 </div>
    </div>
  )
}

export default CreditCard