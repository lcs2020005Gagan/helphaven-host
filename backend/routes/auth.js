const express=require("express")
const bodyParser = require("body-parser");
const User=require("../models/Users")
const Card=require("../models/Cards")
const nodemailer = require("nodemailer");
let fetchuser=require("../middleware/fetchuser")
const router=express.Router()
const app =express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const secretKey="helloworld"
var jwt=require("jsonwebtoken");
var verificationCode=123456
// const fetchmentor = require("../middleware/fetchmentor");
// let success=false



//start


//create user
router.post('/createuser',
[body('name','Enter a valid name').isLength({min:1}),
  body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
  body('profileImg'),
  body('bannerImg'),
  body('about'),
 
 
],
 async (req, res) => {
      success=false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        console.log(user);
        if(user)
        {
            return res.status(400).json({ success,errors: "Email is alerady registered with helphub" });

        }
        else{
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "verifyhelphaven@gmail.com",
              pass: "fvbvqckxfmgkegys"
            }
          });
          
          async function sendVerificationEmail(email) {
            verificationCode = Math.floor(Math.random() * 900000) + 100000;
            console.log("verif code",verificationCode)
            const mailOptions = {
              from: "verifyhelphaven@gmail.com",
              to: email,
              subject: "Please verify your email address",
              text: `Your verification code is ${verificationCode}`
            };
            
            return transporter.sendMail(mailOptions)
              .then(() => {
                return verificationCode;
              })
              .catch((err) => {
                throw new Error("Failed to send verification email: " + err);
              });
          }
          
          const response = await sendVerificationEmail(req.body.email)
          
            var salt = bcrypt.genSaltSync(10);
var secpassword =   bcrypt.hashSync(req.body.password, salt);
console.log(secpassword);
       user=await  User.create({
            name:req.body.name,
          email: req.body.email,
          profileImg: req.body.profileImg,
          bannerImg: req.body.bannerImg,
          email: req.body.email,
          password: secpassword,
          about:req.body.about,
         })
        console.log("user ",user)
        // console.log(user);
        var authtoken=await jwt.sign({id:user.id},secretKey)
        console.log(authtoken);
        // console.log(authtoken)
        success=true
        res.json({success,authtoken});
        success=false;
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
res.send("hello");
  }
);



//verify otp
router.post('/verifyotp', [
  body('otp'),
 ], async (req, res) => {
      try {
        var ans=true
        console.log("from otp backend",typeof(verificationCode),typeof(req.body.otp))
         if(verificationCode!=req.body.otp)
         ans=false;
         res.json({"result":ans})
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

//add friend
router.post('/addfriend/:user_id', fetchuser, [
 
 ], async (req, res) => {
      try {
          const user_id = req.params.user_id;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $push:{
              following:user_id
            }
          })
          await User.findOneAndUpdate({
            _id:user_id
          },{
            $push:{
              followers:req.id
            }
          })
          const user=await User.find({_id:req.id});
          res.json({"message":"friend added successfully","user":user});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

 
  //donation backend
router.post('/donate', fetchuser, [
  body('card_id'),
  body('amountGiven')
 ], async (req, res) => {
      try {
          const card_id = req.body.card_id;
          const amountGiven = req.body.amountGiven;
          console.log(card_id,amountGiven)
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $push:{
              donationsGiven:card_id
            },
            $inc:{
              amountDonated:amountGiven
            }
          })
          const temp=await Card.find({_id:card_id});
          if(!temp){
            res.json("card note found")
          }
          await Card.findOneAndUpdate({
            _id:card_id
          },{
            $inc:{
              amountDonated:amountGiven
            },
            $inc:{
              donations:1
            }
          })
          const user=await User.find({_id:req.id});
          const card=await Card.find({_id:card_id});
          res.json({"user":user,"card":card});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })
  //add hate comment
router.post('/hatecomment/:hateCommentId', fetchuser, [
 ], async (req, res) => {
      try {
          const comment = req.params.hateCommentId;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $push:{
              hateComments:comment
            }
          })
          const user=await User.find({_id:req.id});
          res.json({"user":user});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })



//getuser
router.get('/getuser',fetchuser,
  async (req, res) => {
    await User.find({_id:req.id})
  .select("-password")
  .populate("followers")
  .populate("following")
  .exec()
  .then(p=>{
      res.status(200).json(p)
  })
  .catch(error=>console.log(error));
  });


  //getuser2
router.get('/getuser2',fetchuser,
async (req, res) => {
  await User.find({_id:req.id})
.select("-password")
.exec()
.then(p=>{
    res.status(200).json(p)
})
.catch(error=>console.log(error));
});

//get all user
router.get('/gettopdonors',
  async (req, res) => {
    await User.find().sort({"donationsGiven":-1}).limit(3)
  .select("-password")
  .exec()
  .then(p=>{
      res.status(200).json(p)
  })
  .catch(error=>console.log(error));
  });

  //getuser with specific id
  router.get('/getuserwithid/:id', async (req, res) => {
    try {
        let user =await User.find({_id:req.params.id})
        if(!user)
        {
            res.status(498).send("User not found");
        }
       user=await User.findById(req.params.id)
       .populate("followers")
       .populate("following")
       .exec()
       .then(p=>{
           res.status(200).json(p)
       })
       .catch(error=>console.log(error))
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//update user
router.post('/updateuserprofileimg', fetchuser, [
  body('profileImg'),
 ], async (req, res) => {
      try {
          const profileImg = req.body.profileImg;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              profileImg:profileImg
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

  //update deleted friend
router.post('/deletefriend/:user_id', fetchuser, [
 ], async (req, res) => {
      try {
          const user_id = req.params.user_id;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $pull:{
              following:user_id
            }
          })
         await User.findOneAndUpdate({
            _id:user_id
          },{
            $pull:{
              followers:req.id
            }
          })
         const user=await User.find({_id:req.id});
          res.json({"message":"friend deleted successfully","user":user});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

router.post('/updateuserlikedcards', fetchuser, [
  body('likedCards'),
 ], async (req, res) => {
      try {
          const likedCards = req.body.likedCards;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              likedCards:likedCards
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

router.post('/updateusercardid', fetchuser, [
  body('cardId'),
 ], async (req, res) => {
      try {
          const cardId = req.body.cardId;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              cardId:cardId
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })
router.post('/updateuserbookmarkedCards', fetchuser, [
  body('bookmarkedCards'),
 ], async (req, res) => {
      try {
          const bookmarkedCards = req.body.bookmarkedCards;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              bookmarkedCards:bookmarkedCards
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

  //update user
router.post('/updateuser', fetchuser, [
  body('greaterThan50K'),
 ], async (req, res) => {
      try {
          const ans = req.body.greaterThan50K;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              greaterThan50K:ans,
              defaultValuesAdded:true
            }
          })
         const user=await User.find({_id:req.id});
          res.json({"user":user,"success":true});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })


  //getuser
router.get('/getuser2',fetchuser,
async (req, res) => {
  await User.find({_id:req.id})
.select("-password")
.populate("cardId")
.exec()
.then(p=>{
    res.status(200).json(p)
})
.catch(error=>console.log(error));
});


  //login user
router.post('/loginuser',
[ body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({ success,errors: "wrong email" });
        }
        else{
           var passwordcompare=await bcrypt.compare(req.body.password,user.password)
           if(!passwordcompare)
           {
            return res.status(400).json({success, errors: "wrong passwrod" });
           }

        var authtoken=await jwt.sign({id:user.id},secretKey)
        // console.log(authtoken)
        // setsuccess(true);
        success=true;
        res.json({success,authtoken});
        success=false;  
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
   }
)


  

module.exports=router
