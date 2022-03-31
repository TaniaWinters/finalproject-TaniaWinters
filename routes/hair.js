const express = require('express');
const router = express.Router();


var data = {
    "anna": {
        "name": "Anna Haley",
        "dob": "01/01/1998",
        "imageurl": "/images/hairAnna.jpg",
        "hobbies": ["Colour", "Hilites", "Cut"],
        "visits": [{ "date": "21/03/2021", "task": "Wash cut and blowdry", "product": "Kemon shampoo and conditioner, Kemon hairspray" },
            { "date": "19/01/2021", "task": "Colour + Hilites", "product": "Alfaparf 7nb 1/2 tube + 20% proxide, prelightner + 30% proxide, 11.20 toner + 10% proxide" },
            { "date": "10/12/2020", "task": "cut restyle", "product": "kemon shampoo and conditioner, styling serum, wax" }
        ]
    },

    "chloe": {
        "name": "Chloe Henry",
        "dob": "03/05/1995",
        "imageurl": "/images/hairChloe.jpg"
    },

    "becca": {
        "name": "Becca Furey",
        "imageurl": "/images/hairBecca.jpg"
    }
}


router.get('/', (req, res) =>
    res.render('listing', { personlist: data }))


router.get('/:name', (req, res) => {
    var name = req.params.name;

    if (!data[name]) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    } else {
        res.render('person', { person: data[name] });
    }
})




module.exports = router;