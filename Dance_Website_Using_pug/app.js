const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const body_parser = require('body-parser')
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    firstname: String,
    desc: String
});
const contact =mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) //Used to store the info filled in the form

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("These details have been successfully saved")
    }).catch(() => {
        res.status(400).send("Unsuccessful!!")
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})
