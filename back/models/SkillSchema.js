const mongoose = require('mongoose');

skillSchema = mongoose.Schema({
    name:String,
    
})

const Skill = mongoose.model("Skill",skillSchema);
module.exports = Skill;