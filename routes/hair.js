const express = require('express');
const router = express.Router();
const { readClients } = require('../models/clients');
/*const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authUtils = require('./utils/auth');

MongoClient.connect('mongodb://localhost', (err, client) => {

    if (err) {
        throw err;
    }
    const db = client.db('user-profiles')
    const users = db.collection('users');
    app.local.users = users;
});

passport.use(new Strategy(

            (username, password, done) => {
                app.local.users.findOne({ username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    if (user.password != authUtils.hashPassport(password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                });

                passport.serializeUser((user, done) => {
                    done(null, user._id);
                });
                passport.deserializeUser((id, done) => {

                    done(null, { id });
                });
                // var data = {
                //     "anna": {
                //         "name": "Anna Haley",
                //         "dob": "01/01/1998",
                //         "imageurl": "/images/hairAnna.jpg",
                //         "hobbies": ["Colour", "Hilites", "Cut"],
                //         "visits": [{ "date": "21/03/2021", "task": "Wash cut and blowdry", "product": "Kemon shampoo and conditioner, Kemon hairspray" },
                //             { "date": "19/01/2021", "task": "Colour + Hilites", "product": "Alfaparf 7nb 1/2 tube + 20% proxide, prelightner + 30% proxide, 11.20 toner + 10% proxide" },
                //             { "date": "10/12/2020", "task": "cut restyle", "product": "kemon shampoo and conditioner, styling serum, wax" }
                //         ]
                //     },

                //     "chloe": {
                //         "name": "Chloe Henry",
                //         "dob": "03/05/1995",
                //         "imageurl": "/images/hairChloe.jpg"
                //     },

                //     "becca": {
                //         "name": "Becca Furey",
                //         "imageurl": "/images/hairBecca.jpg"
                //     }
                // }


                // router.get('/', (req, res) =>
                //     res.render('listing', { personlist: data }))


                // router.get('/:name', (req, res) => {
                //     var name = req.params.name;

                //     if (!data[name]) {
                //         console.log('404 because person doesn\'t exist');
                //         res.render('404');
                //     } else {
                //         res.render('person', { person: data[name] });
                //     }
                // })
*/
router.get('/', async(req, res) => {
    const clients = await readClients();

    console.table(clients)

    res.render('listing', { personlist: clients })

})


router.get('/:name', async(req, res) => {
    var name = req.params.name;

    const clients = await readClients({ 'name': name })




    if (!clients) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    } else {
        res.render('person', { person: clients });
    }
})

router.get('/addnew', (req, res) =>
    res.render('personform')
)

router.post('/addnew', (req, res) => {
    await
    CreateHair(req.body)
    req.session.hairdata = { name: req.body.name };
    res.redirect(303, '/hair')
})

module.exports = router;