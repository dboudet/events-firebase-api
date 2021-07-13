const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/',(req,res) => {
    res.send('This is our first get.')
})


app.listen(5000, () => console.log("Listening to http://localhost:5000"))