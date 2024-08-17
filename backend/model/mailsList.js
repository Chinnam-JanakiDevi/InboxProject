const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    from: String,
    date: String,
    body: String
});
const emailList = new mongoose.Schema({
    from:String,
    to:String,
    subject:String,
    body:String,
    date:String,
    replies: [replySchema] // Array of replies
});

module.exports = mongoose.model('emailList', emailList);