const express = require('express')
const app = express()
require("dotenv").config()
require('./config/db')
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posts'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
})
