const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const { getEvents, createEvent, getSingleEvent, deleteEvent, updateEvent, findEventByQuery } = require('./src/events')

app.get('/events/search', findEventByQuery)
app.get('/events/:eventId', getSingleEvent)
app.get('/events', getEvents)
app.get('/',(req,res) => {
    res.send('This is our first get.')
})

app.post('/events', createEvent )

app.patch('/events/:eventId', updateEvent)

app.delete('/events/:eventId', deleteEvent)

app.listen(5000, () => console.log("Listening to http://localhost:5000"))