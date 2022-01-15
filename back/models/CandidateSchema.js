const mongoose = require('mongoose');

candidateSchema = mongoose.Schema({
    name:String,
    title:String,
    email:{
        type:String,
        uniqe:true,
    },
    skills:[String]  
})

const Candidate = mongoose.model("Candidate",candidateSchema);
module.exports = Candidate;