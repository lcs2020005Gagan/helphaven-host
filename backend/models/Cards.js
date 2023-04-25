const mongoose=require("mongoose")

const cardsSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
briefDescription:{
    type:String,
    required:true
},
image:{
    type:String,
},
description:{
    type:String,
    required:true
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
date:{
    type:Date,
    default:Date.now()
},
priority:{
    type:Number,
    default:0
},
tags:{
    type:Array,
    default:["no tags"],
},
likedBy:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default:[""]
  }],
commentsSection:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
    default:[""]
  }],
  bookmarkedBy:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default:[""]
  }],
  views:{
    type:Number,
    default:0
  },
  donations:{
    type:Number,
  },
  amountRequired:{
    type:Number,
    default:10000
  },
  amountDonated:{
    type:Number,
    default:0
  }
});
const cards=mongoose.model("cards",cardsSchema);
cards.createIndexes();
module.exports=cards