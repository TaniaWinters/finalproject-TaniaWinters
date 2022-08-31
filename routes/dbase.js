const express = require('express');
const router = express.Router();
const testData = require('../lib/data.js');

router.get('/', (req, res) => {

    var message = "";

    if (req.signedCookies.tracking) {
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on : " + dateLastVisit;
    }

    var currentDate = new Date();
    res.cookie('tracking', currentDate.toDateString(), { signed: true });

    res.render('home', { 'message': message });
});


router.get('/about', (req, res) => {
    res.render('about', {
        tags: "about, background",
        linkData: [
            { url: "https://data.mongodb-api.com/app/data-dlhrh/endpoint/data/v1", text: '<strong>MongoDB API</strong>' },
            { url: "http://hairspray.ie/", text: 'Hairspray' }
        ]
    })
});

router.get('/contact', (req, res) => {
    res.render('contact', { data: testData.getSampleData() });
});

module.exports = router;