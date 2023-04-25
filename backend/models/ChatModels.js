const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User=require('./Users');
const ChatSchema = new Schema({
  sender: { type: Schema.Types.ObjectId,  ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId,  ref: 'User', required: true },
  messages: [{
    sender: { type: String},
    text: { type: String },
    timestamp: { type: Date, default: Date.now },
  }]
});

const ChatModel = mongoose.model('chats', ChatSchema);
ChatModel.createIndexes();
 //type: Schema.Types.ObjectId , ref: 'User'  required: true
//console.log(ChatModel.findOne())
//export { ChatModel };
module.exports = ChatModel;