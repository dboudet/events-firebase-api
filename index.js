const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const { getEvents, createEvent } = require('./src/events')

app.get('/events', getEvents)
app.get('/',(req,res) => {
    res.send('This is our first get.')
})

app.post('/events', createEvent )


app.listen(5000, () => console.log("Listening to http://localhost:5000"))