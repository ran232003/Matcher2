const mongoose = require('mongoose');

jobSchema = mongoose.Schema({
    title:String,
    
    skills:[{
        type:String,
       
    }]  
})

const Job = mongoose.model("Job",jobSchema);
module.exports = Job;