const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const server = app.listen(3000);
var router = require("./router");

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

const home = require('./routes/home')
const hair = require('./routes/hair');
const { newsMiddleware } = require('./lib/middleware');
const { uploader } = require('./lib/uploader');

const connectionString = 'mongodb://localhost:27017/SS2022';
const db = mongoose.connection;

//const session = require('express-session');
//const MongoDBStore = require('express-mongodb-session')(session);
//const store = new MongoDBStore({
//uri: 'mongodb://mongodb://localhost:27017',
//collection: 'mySessions'
//});

session = require('express');
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});
app.get('/', function(req, res) {
    res.send('Hello ' + JSON.stringify(req.session));
});
app.use(session(

    {
        secret: "Tania is here",
        cookie: {
            maxage: 6000
        },
        resave: false,
        saveUninitialized: false


    }))


app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(cookieParser("Hair Care is key"));

app.use(newsMiddleware)

app.use('/', home)

app.use('/hair', hair)


mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})


// custom 404 page
app.use((req, res) => {
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');

});
/*
// Catch errors
store.on('error', function(error) {
    console.log(error);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));


*/



var session = require('express-session');


server.start(router.route)


const csv = require('./routes/csv')
const users = require('./routes/users');
const { Router } = require('express');
/* Initializing other routes */
app.use("/", require("./routes/csv.js"));
app.use('/', require('./users.js'));

//Router.use("/", require(". / routes / csv "));
//Router.use("/", require("./users.js"));
module.exports = router;



app.listen(port, () => console.log(`Example app listening on port ${port}!`))