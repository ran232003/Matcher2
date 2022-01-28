const mongoose = require('mongoose');

skillSchema = mongoose.Schema({
    name:{
        type:String,
        uniqe:true,
    },
    
})

const Skill = mongoose.model("Skill",skillSchema);
module.exports = Skill;