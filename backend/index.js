const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

 


connectToMongo();
var app = express()
app.use(cors())
const port = 5000
//Available Routes

app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', ()=>{
    console.log("hello world");
})




app.listen(port, () => {
  console.log(`eNoteBook listening at http://localhost:${port}`)
})

