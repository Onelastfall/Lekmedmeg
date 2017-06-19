const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.database.ref('/hei/{key}').onWrite(event => {
    if (event.data.val()){
        admin.database().ref('/hallo').push(event.data.val())
    }
})

exports.sethelloWorld = functions.database.ref('/hei/{key}').onWrite(event => {
    if (event.data.val()) {
        admin.database().ref('/goddag/' + event.params.key).set(event.data.val());
    }
})

exports.count = functions.database.ref('hei/{key}').onWrite(event => {
    if (event.data.exists() && !event.data.previous.exists()) {
        admin.database().ref('/count').transaction(val => (val || 0) + 1)
    }

    if (!event.data.exists() && event.data.previous.exists()) {
        admin.database().ref('/count').transaction(val => (val || 0) - 1)
    }
})