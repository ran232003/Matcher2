const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const matchRouter = require('./routes/match-route');
const app = express();
app.use(bodyParser.json());
app.use(cors())
var request = require('request');
let token;
// mongoose.connect('mongodb://ranfa:232003@cluster0.d2yn9.mongodb.net/movieApp?retryWrites=true&w=majority');
mongoose.connect
('mongodb+srv://ranfa:232003@cluster0.d2yn9.mongodb.net/matchApp?retryWrites=true&w=majority');

app.use("/api/match",matchRouter);

app.use((req,res,next,err)=>{
    const code = err.code||500;
    const message = err.message||"somthing went wrong";
    res.status(code);
    res.json({message:message});
})

const getSkills2 = async()=>{
    const options = {
        method: 'POST',
        url: 'https://auth.emsicloud.com/connect/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        form: {
          client_id: '036ayc1nj9e04brj',
          client_secret: 'VMdvQO6i',
          grant_type: 'client_credentials',
          scope: 'emsi_open'
        }
      };
     
      const tokenType = "Bearer"
        let res2 = await request(options,async function (error, response, body) {
        if (error) throw new Error(error);
        
       // console.log(body);
        const obj = await JSON.parse(body);
        token = obj.access_token;
        
    });
}
//getSkills2();
app.listen(5000, () => {
    console.log('Example app is listening on port 5000.')
    //console.log(dummy);
}
);
module.exports = {
    token:token
}