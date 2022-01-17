const Candidate = require("../models/CandidateSchema");
const Job = require("../models/JobSchema");
const Skill = require("../models/SkillSchema");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
var request = require('request');
let token;
var rp = require('request-promise');
const MyError = require("../models/MyError");


const getCandidates = async(req,res,next)=>{
    let{job,skills} = req.body;
  
    //const candidates = await Candidate.find({ title: job}).exec();
    //const candidates2 = await Candidate.find({ title: {$ne:job}}).exec();
    const candidates3 = await Candidate.find({$or:[{ skills: {$in:skills}},{title: job}]}).exec();
    

    res.json({candidates:candidates3});

}
const getJobs = async(req,res,next)=>{
    let jobs = await Job.find({},'-skils');
    if(!jobs){
        const error = new myError("no users found",404);
        return next(error);

    }
    // users = users.map((user)=>{
    //     return user.toObject({getters: true})
    // })
    res.json({jobs:jobs});
}
const addCandidate = async(req,res,next)=>{
    const {email,name,lastName,skills,job} = req.body;
    //check if email unique
    console.log("email",req.body);
    userFromDb = await Candidate.findOne({email:email})
    if(userFromDb){
        //email in the system
        const myErorr = new MyError("user is in the system",401);
        return next(myErorr);
    }

    let candidate = new Candidate({
        email:email,
        name:name,
        lastName:lastName,
        skills:skills,
        title:job
    })
    let jobfromDb = await Job.findOne({title:job})
    console.log(jobfromDb);
    if(jobfromDb){
        console.log("in if");
        skills.forEach(async(skill)=>{
           await jobfromDb.push(skill);
        })
        await jobfromDb.save();
    }
    else{
        console.log("in else");
        let newJob = new Job({
            title:job,
            skills:skills
        })
        await newJob.save();

    }
    await candidate.save()
    res.send({status:"ok"})
}

const getSkills = async(req,res,next)=>{
    const skills = await Skill.find({});
    
    res.json({skills:skills});
}

    
const req2 = async(req,res,next)=>{
    console.log("url param",req.params.skill);
    let skillFromFront = req.params.skill;
    if(skillFromFront == undefined){
        console.log("inside if")
        skillFromFront = "java";
    }
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
      rp(options).then(function(body){    
        const obj =  JSON.parse(body);
        token = obj.access_token;
        
      }).then(function(){
        //console.log("before request2 and token",token);
        const options2 = {
        method: 'GET',
        url: 'https://emsiservices.com/skills/versions/latest/skills',
        qs: {q: skillFromFront, limit: '10'},
        headers: {Authorization: `Bearer ${token}`}
    }
    //console.log("before request2 and token",token);
    rp(options2).then(function(body){
       
      
        //console.log("body2",body);
        let data = JSON.parse(body);
        let dataArray = data.data;
        let arrayOfSkills = [];
        dataArray.forEach(element => {
            
            arrayOfSkills.push(element.name)
        });
      // console.log(arrayOfSkills)
       res.send({skills:arrayOfSkills})
     
})
      }) 
      
        
        
    };

const getJobsTitle = async(req,res,next)=>{
    console.log("url param",req.params.job);
    let jobFromFront = req.params.job;
    console.log("jobFromFront",jobFromFront)
    if(typeof jobFromFront === 'undefined'){
        jobFromFront = "software"
        console.log("jobFromFront",jobFromFront)
    }
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
     console.log("before request");
      const tokenType = "Bearer"
      //body is what coming from api
      rp(options).then(function(body){    
        const obj =  JSON.parse(body);
        token = obj.access_token;
        
      }).then(function(){
        //console.log("before request2 and token",token);
        const options2 = {
        method: 'GET',
        url: 'https://emsiservices.com/titles/versions/latest/titles',
        qs: {q: jobFromFront, limit: '10', page: '1'},
        headers: {Authorization: `Bearer ${token}`}
    }
    //console.log("before request2 and token",token);
    rp(options2).then(function(body){
       
      
        //console.log("body2",body);
        let data = JSON.parse(body);
        let dataArray = data.data;
        let arrayOfJobss = [];
        dataArray.forEach(element => {
            console.log(element.name)
            arrayOfJobss.push(element.name)
        });
      // console.log(arrayOfSkills)
       res.send({jobs:arrayOfJobss})
     
})
      }) 
}

module.exports = {
    getCandidates:getCandidates,
    getSkills:getSkills,
    getJobs:getJobs,
    req2:req2,
    getJobsTitle:getJobsTitle,
    addCandidate:addCandidate,
}