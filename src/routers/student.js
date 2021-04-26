const express =require('express')
const Student = require('../models/student')
const router = new express.Router()
const path = require('path')

const dirpath = path.join(__dirname,'../public/create-student.html')
router.get('/api/students',(req,res)=>{
    res.sendFile(dirpath)
 
})



//create new student
router.post('/web/students/create',async (req,res)=>{
    const student = new Student(req.body)

    try {
        await student.save()
        res.status(201).send(student)
        
    } catch(e){
        res.status(400).send(e)

    }

})

//read all students

router.get('/web/students/read',async (req,res)=>{
    
    try{
        const students = await Student.find({})
        if (!students){
            return res.status(404).send()
        }
        res.send(students)

    }catch(e){
        res.status(404).send(e)

    }
   
})

//read a student with code
router.get('/web/students/read/:code',async (req,res)=>{
    
    const code =req.params.code
    try{
        const student = await Student.findOne({code})
        if (!student){
            return res.status(404).send()
        }
        res.send(student)

    }catch(e){
        res.status(404).send(e)

    }
   
})
//update students with its code

router.patch('/web/students/update/:code',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","code"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'})
    }
    const code = req.params.code

    try{
        const student = await Student.findOne({code})
        
        updates.forEach((update) => student[update] = req.body[update])
        await student.save()

        if(!student){
            return res.status(404).send()
        }
        res.send(student)


    }catch(e){
        res.status(400).send(e)

    }
})

//delete student with its code

router.delete('/web/students/delete/:code',async (req,res)=>{
    const code = req.params.code
    try{
        const student = await Student.findOneAndDelete(code)
        if(!student){
            res.status(404).send()
        }
        res.send('Student deleted successfully!')

    }catch(e){
        res.status(500).send(e)

    }
})
module.exports=router