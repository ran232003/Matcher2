const mongoose = require('mongoose');

jobSchema = mongoose.Schema({
    title:String,
    
    skils:[{
        type:String,
       
    }]  
})

const Job = mongoose.model("Job",jobSchema);
module.exports = Job;