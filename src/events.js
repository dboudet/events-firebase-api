const { req, res } = require('express')
const admin = require('firebase-admin')
const credentials = require('../credentials.json')

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
        .then(eventsCollection => {
            let allEvents = eventsCollection.docs.map(eventDoc => {
                let event = eventDoc.data()
                event.id = eventDoc.id
                return event
            })
            res.send(allEvents)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

//create a POST request - to add new events
exports.createEvent = (req,res) => {
    const db = connectDb()
    db.collection('events')
        .add(
            {...req.body,
                "drinks on":"Jonathan"
            }
        )
            .then(singleEvent => res.status(200).send(`New event created with id: ${singleEvent.id}`))
        .catch(err => res.status(500).send(err))
}

// GET ONE event request (by ID)
exports.getSingleEvent = (req,res) => {
    const db = connectDb()
    if(!req.params.eventId) {
        res.status(404).send("No event specified.")
        return
    }
    db.collection('events').doc(req.params.eventId).get()
        .then( doc => {
            let event = doc.data()
            event.id = doc.id
            res.send(event)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error getting event."),err
        })
}

// create DELETE request - to delete one event
exports.deleteEvent = (req,res) => {
    const db = connectDb()
    if(!req.params.eventId) {
        res.status(404).send("No event specified.")
        return
    }
    // const { eventId } = req.params
    // db.connection('events').doc(eventId).delete()
    db.collection('events').doc(req.params.eventId).delete()
        .then( res.status(203).send("Event successfully deleted."))
        .catch(err => {
            console.log(err)
            res.status(500).send("Error deleting event.",err)
        })
}

// create PATCH request - to update one event
exports.updateEvent = (req,res) => {
    const db = connectDb()
    const { eventId } = req.params
    db.collection('events').doc(eventId).update(
        {...req.body,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            "drinks on":"Jonathan"
        }
        )
        .then( () => res.status(201).send(`Event ${eventId} updated.`))
        .catch( err => res.status(500).send(err))
}

// make a SEARCH request - to find one event (by name)
exports.findEventByQuery = (req,res) => {
    const db = connectDb()
    const { queryName } = req.query
    db.collection('events').where('name','==', queryName).get()
        .then( eventsCollection => {
            const matches = eventsCollection.docs.map( eventDoc => {
                let event = eventDoc.data()
                event.id = eventDoc.id
                return event
            })
            res.send(matches)
        })
        .catch(err => res.status(500).send(err))
}
