const connectToMongo=require('./db')
const express = require('express')
const mongoose=require("mongoose")
var cors=require('cors')
const http = require('http');
const socketIO = require('socket.io');
mongoose.set('strictQuery', false);
const ChatModel=require("./models/ChatModels")
connectToMongo();
const app = express()

app.use(cors())
app.use(express.json());
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow requests from this origin
    //methods: ["GET", "POST"] // Allowed HTTP methods
  }
});
const port = 5000
const Users=require('./models/Users');
const { timeStamp } = require('console');
//const ChatModel=('./models/ChatModel');

//const channels = {};  
//console.log(Users.findOne())

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.get('/api/people', async (req, res) => {
  const search = req.query.search; // Get the search query parameter from the request URL
  console.log(search)
  try {
    const result =  await Users.find({ name: new RegExp('^'+search, 'i') }).select('name _id').exec(); // Query the database for persons with names matching the search term
    console.log(result)
    res.send(result); // Send the result back to the client
  }
   catch (error) {
    console.error(error); // Log any errors that occur
    res.status(500).send({ error: 'An error occurred while fetching the data' }); // Send an error response to the client
  }
});
//console.log(Card);
//console.log("check");
/*mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database');
    
  })
  .catch((error) => {
    console.error(error);
  });*/
  //console.log(  ChatModel.findOne());
  io.on('connection', (socket) => {
    socket.on("join",(currentUser,r)=>{
     // console.log("current user is ", currentUser)
   
   //   console.log(currentUser, r)
      ChatModel.findOne({ sender: currentUser, receiver:r  }, (err, chat) => {
        if (err) {
          console.log(err);
          //return res.status(500).json({ message: 'Failed to check chat' });
        }
       // console.log("found chat between user and receiver",chat)
        if (!(chat==null) ){
          //console.log("found");
       //   console.log(chat);
         // console.log(JSON.stringify(chat))

          socket.emit("receivedata",chat);
          //console.log("found a chat")
        }
        else
        {
          console.log("found");
          const newChat = new ChatModel({
            sender: currentUser,
            receiver: r ,
            messages: [{
             
            }]
          });
          const newChat2 = new ChatModel({
            sender: r ,
            receiver: currentUser,
            messages: [{
        
            }]
          });
          newChat.save((err, chat) => {
            if (err) {
              console.log(err);
            }
        
            //console.log(chat);
            
          });
          newChat2.save((err, chat) => {
            if (err) {
              console.log(err);
            //  return res.status(500).json({ message: 'Failed to save chat' });
            }
        
          //  console.log(chat);
          //  return res.status(200).json({ message: 'Chat saved successfully' });
          });
      //    console.log("made new chats");
        }
    })})
    
   
    //


    // Handle a new chat message from a client
    socket.on("message", (s,sname,r,newMessage) => {
    //console.log('New message received:', s, r,newMessage);
  
    ChatModel.findOne({ sender: s, receiver:r }, (err, chat) =>{
   //console.log(chat);
   const lol=chat.messages
   //console.log(chat.messages )
      const temp  =lol.map(function(num) {
       console.log("sender of the message is",num.sender);
        const mess= {sender:num.sender,text:num.text ,timeStamp:num.timeStamp}
        return  mess
      });
    
   let t=[...temp,{sender:sname,text:newMessage,timeStamp:Date.now}]
   //console.log(t) 
     //t.shift();
    // console.log(t); 
      const nchat=new  ChatModel({
        sender: s,
      receiver:r,
        messages:t
      });
      const nchat2=ChatModel({
        sender: r,
      receiver:s,
        messages:t
      });
     // console.log(nchat,nchat2)
     ChatModel.deleteMany({ sender: s ,receiver:r}) .then(result => {
        console.log(`Deleted ${result.deletedCount} document(s).`);
        nchat.save(()=>io.emit('message', r,sname,s,newMessage ) )
     //   ChatModel.findOne({ sender:s ,receiver:r},(error,chat)=>{console.log("printing",chat); })
     
      })
      .catch(error => {
        console.error(error);
      });
     ChatModel.deleteMany({ sender: r ,receiver:s}) .then(result => {
        console.log(`Deleted ${result.deletedCount} document(s).`);
        nchat2.save(()=>
        io.emit('message', s,sname,r,newMessage )
      
      )})
      .catch(error => {
        console.error(error);
      });
     
        // ChatModel.updateOne({ sender:"akshat" ,receiver:"Akshat"}, {$set:{ messages: t }})  
   
 
        });
    // Add the new message to the channel's message list
     // Broadcast the new message to all connected clients in the same channel
    });
    socket.on("getReceiverName",(r)=>{
      Users.findOne({_id:r}).exec((err,user)=>{

         socket.emit("getReceiverName",user?.name)
       })
console.log("to find name" ,r)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    }); 
  });
  server.listen(5000, () => {
    console.log('Server started on port 5000');
  });

                           
 app.use("/api/auth",require("./routes/auth"))
 app.use("/api/upload",require("./routes/upload"))
                                                           
                                           
                                         
// server.listen(port, () => {
//   console.log(`listening to ${port}`)
//})