const admin = require('firebase-admin')
const credentials = require("../credentials.json")

function connectDb() {
    if(!admin.apps.length){
        admin.initializeApp({
          credential: admin.credential.cert(credentials)
        })
    }    
    return admin.firestore()
}

exports.getEvents = (req,res) => {
    const db = connectDb()
    db.collection('events')
        .get()
        .then(allEvents => allEvents.docs.map(doc => console.log(doc.data())))
        res.send("Got all events.")
        .catch(err => console.log(err))
}

//create a POST request - to add new events
exports.createEvent = (req,res) => {
    const db = connectDb()
    db.collection('events')
        .add(
            {
                "where": "Palm Beach Gardens",
                "paying": "Jonathan",
                "name": "Brunch at Twisted Trunk Brewing",
                "time": "11:00 a.m.",
                "date": "July 22, 2021"
            }
        )
        .then(singleEvent => res.status(200).send(`New event created with id: ${singleEvent.id}`))
        .catch(err => res.status(500).send(err))
}

// create GET - ONE event request (by ID)
exports.getSingleEvent = (req,res) => {
    const db = connectDb()
    db.collection('events')
        .get()
        .then()
        .catch(err => res.send("Error getting event:"),err)
}
// create DELETE request - to delete one event

// create PATCH request - to update one event

// make a SEARCH request - to find one event
// make it dynamic using body of request in Postman