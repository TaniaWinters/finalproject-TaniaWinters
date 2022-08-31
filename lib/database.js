const mongoose = require('mongoose');
const { readClients } = require('../models/clients.js');

const Staff = require('../models/client.js');

const connectionString = ''

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    'useCreateIndex': true
}).
catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});



// Check if there is already any data in the database, if so - do nothing.
// if there is no data create three new 'client' documents and store them in the database.
// 

Client.find((err, client) => {
    if (err) return console.error(err);

    if (client.length) return;

    new Client({
        "name": "Jamie",
        "dob": "01/01/1993",
        "imageurl": "/",
        "hobbies": ["Swimming", "Basketball", "Soccer"]
    }).save();

    new Client({
        "name": "Casey",
        "dob": "03/05/1995",
        "imageurl": "/images"
    }).save();

    new Client({
        "name": "Taylor",
        "imageurl": "/images/"
    }).save();

});

async function createlient(data) {
    let clientDoc = newClient(data);
    await clientDoc.save()
}


async function deleteClient(name) {
    staff = await Client.findOne({ name: name });
    await Client.remove();
}

async function updateClient(data) {
    var id = data._id;
    console.log(id);
    await Client.findByIdAndUpdate({ _id: id }, {...data })
}

async function readClient(options = {}) {

    //lean returns a json object rather than a mongoose document.
    return Client.find(options).lean();
}

module.exports = {



    readClient: readClients,
    createClient: createClient,
    deleteClient: deleteClient,
    updateClient: updateClient
}