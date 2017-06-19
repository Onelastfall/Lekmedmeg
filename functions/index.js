const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.employCount = functions.database.ref('/Person/Organisation/{key}').onWrite(event => {
    if (event.data.exists() && !event.data.previous.exists()) {
        admin.database().ref('/Organisation/employCount').transaction(val => (val || 0) + 1);
    }

    if (!event.data.exists() && event.data.previous.exists()) {
        admin.database().ref('/Organisation/employCount').transaction(val => (val || 0) - 1);
    }
})

// Må se litt mer på denne.
exports.competencyPersonPush = functions.database.ref('/personCompetency/{personId}/{competencyId}').onWrite(event => {
    if (event.data.exists() && !event.data.previous.exists()) {
        admin.database().ref(`/person/${event.params.personId}`).once('value', snapshot => {
            console.log(snapshot)
            admin.database().ref(`/competencyPerson/${event.params.competencyId}/${event.params.personId}`).transaction(data => snapshot.val())
        })
    }
})