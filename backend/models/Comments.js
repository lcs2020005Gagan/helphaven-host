const mongoose=require("mongoose")

const commentsSchema=new mongoose.Schema({
comment:{
    type:String,
    required:true
},
author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },  
 card:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
  },
  likes:{
    type:Number,
  },
  date:{
    type:Date,
    default:Date.now()
  },  
});
const comments=mongoose.model("comments",commentsSchema);
comments.createIndexes();
module.exports=comments