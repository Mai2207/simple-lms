const express = require('express')
require('./db/mongoose')
const studentRouter= require('./routers/student')
const courseRouter = require('./routers/course')
const path =require('path')
const bodyParser = require('body-parser')

const app=express()
const port = process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(studentRouter)
app.use(courseRouter)



app.listen(port ,()=>{
    console.log('Server is up on port ' + port)
   
})
