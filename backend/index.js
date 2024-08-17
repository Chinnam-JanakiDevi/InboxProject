const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailList=require("./model/mailsList")

const app = express();
const PORT = 7000;

app.use(cors({
    origin:["https://businessproject-jet.vercel.app"],
    methods:["post","get"],
    credentials:true
}));
// app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Connection to cloud MongoDB with the correct database suppliersDB
const url = "mongodb+srv://gofood:mlRWAjwjIoCKM3TP@cluster0.5qbblkc.mongodb.net/inboxDB?retryWrites=true&w=majority&appName=Cluster0/suppliersDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
    console.log('Connected successfully to MongoDB');
});
app.get("/", (req, res) => {
    console.log("hello");
    res.json("hello")
})

//save the emails in db 
app.post('/emails', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://inbox-project.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const { from,to,subject,body } = req.body
    const details = {
        from:from,
        to:to,
        subject:subject,
        body:body,
        date: new Date().toISOString()
    };
    console.log(details);
    try {
        const user = new emailList(details);
        await user.save();
        res.status(201).json({ message: 'User details updated successfully', data: { from } });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//get the emails from emailList
app.get('/Reademails', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://inbox-project.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    try {
        const emails = await emailList.find();  // Fetch all emails from the database
        console.log(emails);
        res.status(200).json(emails);  // Send the emails back to the client
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle replies
app.post('/reply/:emailId', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://inbox-project.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    try {
      const { emailId } = req.params;
      const { from, to, subject, body } = req.body;
  
      const email = await emailList.findById(emailId);
      if (!email) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      // Add the reply to the email's replies array
      email.replies.push({
        from,
        date: new Date().toISOString(),
        body
      });
  
      // Save the updated email document
      await email.save();
  
      res.status(200).json({ message: 'Reply added successfully' });
    } catch (error) {
      console.error('Error adding reply:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
});


