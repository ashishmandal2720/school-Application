const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
require('./models/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const  authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes);

const  schoolRoutes = require('./routes/schoolRoutes')
app.use('/school', schoolRoutes);

const  classRoutes = require('./routes/classRoutes')
app.use('/class', classRoutes);

const  studentRoutes = require('./routes/studentRoutes')
app.use('/student', studentRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })