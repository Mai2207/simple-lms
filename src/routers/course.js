const express =require('express')
const Course = require('../models/course')
const router = new express.Router()
const path = require('path')


router.get('/api/courses',(req,res)=>{
    res.sendFile(__dirname+'../public/create-course.html')
 
})

//create new course
router.post('/web/courses/create',async (req,res)=>{
    const course = new Course(req.body)

    try {
        await course.save()
        res.status(201).send(course)
    } catch(e){
        res.status(400).send(e)

    }

})

//read all courses

router.get('/web/courses/read',async (req,res)=>{
    
    try{
        const courses = await Course.find({})
        if (!courses){
            return res.status(404).send()
        }
        res.send(courses)

    }catch(e){
        res.status(404).send(e)

    }
   
})
//read a course with its code

router.get('/web/courses/read/:code',async (req,res)=>{
    const code = req.params.code
    try{
        
        const course = await Course.findOne({code})
        if (!course){
            return res.status(404).send()
        }
        res.send(course)

    }catch(e){
        res.status(404).send(e)

    }
   
})

//update courses

router.patch('/web/courses/update/:code',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","code","description"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'})
    }
    const code = req.params.code

    try{
        const course = await Course.findOne({code})
        
        updates.forEach((update) => course[update] = req.body[update])
        await course.save()

        if(!course){
            return res.status(404).send()
        }
        res.send(course)


    }catch(e){
        res.status(400).send(e)

    }
})

//delete course

router.delete('/web/courses/delete/:code',async (req,res)=>{
    const code = req.params.code
    try{
        const course = await Course.findOneAndDelete(code)
        if(!course){
            res.status(404).send()
        }
        res.send('Course deleted successfully!')

    }catch(e){
        res.status(500).send(e)

    }
})
module.exports=router