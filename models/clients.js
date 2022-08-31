const mongoose = require('mongoose');



const clientSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    imageurl: String,
    hobbies: String,
    visits: String

})

const Clients = mongoose.model('Clients', clientSchema)

readClients = async(options = {}) => {
    if (Object.entries(options).length == 0)
        return Clients.find().lean();

    else if (options.name)

        return Clients.findOne(options).lean();

    else
        return undefined;

}

exports.readClients = readClients;