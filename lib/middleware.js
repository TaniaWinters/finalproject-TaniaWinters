const getNewsData = () => [{
        heading: 'Hair of the Day',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'Tania - S00213820'
    },
    {
        heading: 'A colourful experience',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'me again, Tania',

    }
]

const newsMiddleware = (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}

module.exports = { newsMiddleware: newsMiddleware }