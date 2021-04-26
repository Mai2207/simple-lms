const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        uppercase:true

    },
    code:{
        type:String,
        required:true,
        match:/\b[a-zA-Z0-9]{7}\b/
        
        
    },
    id:{
        type:String,
        
        
    }
    
})
const Student = mongoose.model('Student',studentSchema)
module.exports = Student