import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
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




import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import TextField from '@mui/material/TextField';


import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
    import axios from 'axios';

import { FiLogIn } from 'react-icons/fi'
import ButtonComp from './ButtonComp';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'hsla(0, 0%, 2%, 1)',
    boxShadow: 24,
    p: 4,
    fontFamily: '"Cascadia Code",Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace',
    
};


export default function BasicModal(props) {
    const [open, setOpen] = React.useState(props.defaultState?props.defaultState:false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selected, setSelected] = useState([]);

    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
   
        const [WorkClass, setWorkClass] = React.useState('');
        const [note, setNote] = React.useState({'age':30,'hours-per-week':40,'capital-gain':0.0,'capital-loss':0.0,'education-num':15.0});
        const [Occupation, setOccupation] = React.useState('');
        const [age,setAge]=React.useState('')
        const [Education, setEducation] = React.useState('');
        const [MaritalStatus, setMaritalStatus] = React.useState('');
        const [RelationshipStatus, setRelationshipStatus] = React.useState('');
        const [Race, setRace] = React.useState('');
        const [Sex, setSex] = React.useState('');
        const [Country, setCountry] = React.useState('');
        const [greaterThan50K,setGreaterThan50K]=useState(0)

        const handleChange = (event) => {
          setWorkClass(event.target.value);
        };
        const handleChangeEducation = (event) => {
          setEducation(event.target.value);
        };
        const handleChangeOccupation = (event) => {
            setOccupation(event.target.value);
        };
        const handleChangeAge = (event) => {
            setAge(event.target.value);
        };
        const handleChangeMaritalStatus= (event) => {
            setMaritalStatus(event.target.value);
        };
        const handleChangeRelationshipStatus= (event) => {
            setRelationshipStatus(event.target.value);
        };
        const handleChangeRace= (event) => {
            setRace(event.target.value);
        };
        const handleChangeSex= (event) => {
            setSex(event.target.value);
        };
        const handleChangeCountry= (event) => {
            setCountry(event.target.value);
        };
        const handleChangeNote=(e)=>{
                setNote({ ...note, [e.target.id]: e.target.value })
                // console.log(note);
        }
        const handleSubmit=async()=>{
            const ser= {'age':[note['age']],'workclass':[WorkClass],'education_level':[Education],'education-num':[note['education-num']],'marital-status':[MaritalStatus],'occupation':[Occupation],'relationship':[RelationshipStatus],'race':[Race],'sex':[Sex],'capital-gain':[note['capital-gain']],'capital-loss':[note['capital-loss']],'hours-per-week':[note['hours-per-week']],'native-country':[Country]};
console.log(ser)
axios.post('http://localhost:8001/api/post-data', {
    data: ser
  })
  .then(response => {
    setGreaterThan50K(response.data)
    console.log("income",greaterThan50K);
  })
  .catch(error => {
    console.log(error);
  });
  const host="http://localhost:5000"

  const response=await fetch(`${host}/api/auth/updateuser`,{
    method: 'POST',
    headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
      body: JSON.stringify({greaterThan50K}),
  });
  const json = await response.json();
  console.log(json);
  if (json.success) {
      console.log("success mf")
      window.location.reload();

  }
  else {
      console.log("invalid cred")
  }
        }
    return (

        <>
            <div className="pushlish-request" onClick={handleOpen}>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} style={{
                    "display": "flex", "gap": "3rem", "height": "99%", "width": "99%", "borderRadius": "1rem", "padding": "1rem","overflow":"auto", "boxShadow": "0 0 1px 1px hsla(0, 0%, 100%, 0.6 )"

                }}>

<ThemeProvider theme={darkTheme}>

                    <MDBContainer className="d-flex flex-column">

                        <MDBTabsContent>

                            <MDBTabsPane show={justifyActive === 'tab1'} style={{"display":"flex","flexDirection":"column","gap":"0.8rem"}}>

                            <div className="Heading" style={{"marginBottom":"2rem"}}>
                                Please take a moment to fill this out:
                            </div>
                            {/* <div className="FormFields"> */}

                             {/* <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="work-class">Work Class</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={WorkClass}
          onChange={handleChange}
          autoWidth
          label="WorkClass"
        >
         
        <MenuItem value={"Self-emp-inc"}>Self-emp-inc</MenuItem>
          <MenuItem value={"Federal-gov"}>Federal-gov</MenuItem>
          <MenuItem value={"Private"}>Private</MenuItem>
          <MenuItem value={"State-gov"}>State-gov</MenuItem>
          <MenuItem value={"Self-emp-not-inc"}>Self-emp-not-inc</MenuItem>
          <MenuItem value={"Without-pay"}>Without-pay</MenuItem>
          <MenuItem value={"Local-gov"}>Local-gov</MenuItem>
   
        </Select>
      </FormControl> */}
      {/* <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Occupation</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Occupation}
          onChange={handleChangeOccupation}
          autoWidth
          label="Occupation"
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Craft-repair"}>Craft-repair</MenuItem>
          <MenuItem value={"Priv-house-serv"}>Priv-house-serv</MenuItem>
          <MenuItem value={"Armed-Forces"}>Armed-Forces</MenuItem>
          <MenuItem value={"Sales"}>Sales</MenuItem>
          <MenuItem value={"Farming-fishing"}>Farming-fishing</MenuItem>
          <MenuItem value={"Protective-serv"}>Protective-serv</MenuItem>
          <MenuItem value={"Tech-support"}>Tech-support</MenuItem>
          <MenuItem value={"Exec-managerial"}>Exec-managerial</MenuItem>
          <MenuItem value={"Handlers-cleaners"}>Handlers-cleaners</MenuItem>
          <MenuItem value={"Adm-clerical"}>Adm-clerical</MenuItem>
          <MenuItem value={"Machine-op-inspct"}>Machine-op-inspct'</MenuItem>
          <MenuItem value={"Prof-specialty"}> Prof-specialty</MenuItem>
          <MenuItem value={"Transport-moving"}>Transport-moving</MenuItem>
          <MenuItem value={"Other-service"}>Other-service</MenuItem>

        </Select>
      </FormControl> */}
      {/* </div> */}
      <div className="FormFields">
    <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Education</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Education}
          onChange={handleChangeEducation}
          autoWidth
          label="Education"
        >         
        <MenuItem value={"Bachelors"}>Bachelors</MenuItem>
        <MenuItem value={"Assoc-acdm"}>Assoc-acdm</MenuItem>
        <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
        <MenuItem value={"HS-grad"}> HS-grad</MenuItem>
        <MenuItem value={"Assoc-voc"}>Assoc-voc</MenuItem>
        <MenuItem value={"1st-4th"}>1st-4th</MenuItem>
        <MenuItem value={"10th"}>10th</MenuItem>
        <MenuItem value={"Prof-school"}>Prof-school</MenuItem>
        <MenuItem value={"Some-college"}>Some-college</MenuItem>
        <MenuItem value={"Preschool"}>Preschool</MenuItem>
        <MenuItem value={"12th"}>12th</MenuItem>
        <MenuItem value={"7th-8th"}>7th-8th</MenuItem>
        <MenuItem value={"9th"}>9th</MenuItem>
        <MenuItem value={"Masters"}>Masters</MenuItem>
        <MenuItem value={"11th"}>11th</MenuItem>
        <MenuItem value={"5th-6th"}>5th-6th</MenuItem>
 
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Native Country</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Country}
          onChange={handleChangeCountry}
          autoWidth
          label="Country"
        >         
{['Cambodia', 'Canada', 'China', 'Columbia', 'Cuba', 'Dominican-Republic', 'Ecuador', 'El-Salvador', 'England', 'France', 'Germany', 'Greece', 'Guatemala', 'Haiti', 'Holand-Netherlands', 'Honduras', 'Hong', 'Hungary', 'India', 'Iran', 'Ireland', 'Italy', 'Jamaica', 'Japan', 'Laos', 'Mexico', 'Nicaragua', 'Outlying-US(Guam-USVI-etc)', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto-Rico', 'Scotland', 'South', 'Taiwan', 'Thailand', 'Trinadad&Tobago', 'United-States', 'Vietnam', 'Yugoslavia'].map(country => (
  <MenuItem value={country} key={country}>{country}</MenuItem>
))}    </Select>

      </FormControl>

      </div>

           
            <div className="FormFields">
            <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Marital Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={MaritalStatus}
          onChange={handleChangeMaritalStatus}
          autoWidth
          label="MaritalStatus"
        >         
        <MenuItem value={"Never-married"}>Never-married</MenuItem>
        <MenuItem value={"Separated"}>Separated</MenuItem>
        <MenuItem value={"Divorced"}>Divorced</MenuItem>
        <MenuItem value={"Married-AF-spouse"}>Married-AF-spouse</MenuItem>
        <MenuItem value={"Widowed"}>Widowed</MenuItem>
        <MenuItem value={"Married-spouse-absent"}>Married-spouse-absent</MenuItem>
        <MenuItem value={"Married-civ-spouse"}>Married-civ-spouse</MenuItem>
    </Select>
      </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Relationship Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={RelationshipStatus}
          onChange={handleChangeRelationshipStatus}
          autoWidth
          label="RelationshipStatus"
        >         
        <MenuItem value={"Wife"}>Wife</MenuItem>
        <MenuItem value={"Other-relative"}>Other-relative</MenuItem>
        <MenuItem value={"Not-in-family"}>Not-in-family</MenuItem>
        <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
        <MenuItem value={"Own-child"}>Own-child</MenuItem>
        <MenuItem value={"Husband"}>Husband</MenuItem>
</Select>
      </FormControl>
      </div>

      <div className="FormFields">
            <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Race</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Race}
          onChange={handleChangeRace}
          autoWidth
          label="Race"
        >         
        <MenuItem value={"White"}>White</MenuItem>
        <MenuItem value={"Asian-Pac-Islander"}>Asian-Pac-Islander</MenuItem>
        <MenuItem value={"Black"}>Black</MenuItem>
        <MenuItem value={"Amer-Indian-Eskimo"}>Amer-Indian-Eskimo</MenuItem>
        <MenuItem value={"Other"}>Other</MenuItem>
   </Select>
      </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }} style={{"width":"100%"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Sex</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Sex}
          onChange={handleChangeSex}
          autoWidth
          label="Sex"
        >         
        <MenuItem value={"Female"}>Female</MenuItem>
        <MenuItem value={"Male"}>Male</MenuItem>
    </Select>
      </FormControl>
      </div>
       
      <div className="FormFields">
        

        <div>
        <TextField id="age" label="Age" variant="standard" onChange={handleChangeNote} style={{"width":"100%"}}/>
        {/* <TextField id="hours-per-week" label="Hours per week" variant="standard" onChange={handleChangeNote} /> */}
        </div>
        <div className="FormFields">
        {/* <TextField id="capital-gain" label="Capital-gain" variant="standard" onChange={handleChangeNote}/> */}
        {/* <TextField id="capital-loss" label="Capital-loss" variant="standard" onChange={handleChangeNote}/> */}
        {/* <TextField id="education-num" label="Education number" variant="standard" onChange={handleChangeNote}/> */}
        </div>
   
       
              </div>
                             <div className="publish-button" onClick={handleSubmit} style={{"marginTop":"2rem"}} >
                                <ButtonComp title="Submit"/>
                                </div>
                                     </MDBTabsPane>

                        </MDBTabsContent>

                    </MDBContainer>
                    </ThemeProvider>

                </Box>
                
            </Modal>
           
        </>
    );
}



