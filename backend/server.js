const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000

require('./config/db')()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.send("server created")
})

// ...........import routing..........//
const taskRoute = require('./routes/taskRoute')
const BlogRoute  = require('./routes/blog.route')


// .......setup api roting...........//
app.use('/api/task',taskRoute)
app.use('/api/blog',BlogRoute)



app.listen(PORT,()=>console.log(`sever connected http://localhost:${PORT}`))