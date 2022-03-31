const express = require('express');
const router = express.Router();


const linksForHome = [{ url: 'hairspray.ie', text: 'youtube.com/watch?v=OJiMK1fbkSo' },
    { url: 'glaminati.com/wedding-hair-styles/', text: 'headcurve.com/hair/wedding-hairstyles/' }
];


router.get('/', (req, res) => {

    var message = "";

    if (req.signedCookies.tracking) {
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back :" + req.signedCookies.tracking;
    }

    var currentDate = new Date();

    res.cookie('tracking', currentDate.toUTCString(), { signed: true });
    res.render('home', { 'message': message, links: linksForHome });
});


router.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Our Salon');
});

router.get('/contact', (req, res) => {
    res.type('text/plain');
    res.send('Reply within 48 hours, please be patient with us');
});

module.exports = router;