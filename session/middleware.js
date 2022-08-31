// Use the session middleware
app.use(session({ secret: 'Tanias project is not going well', cookie: { maxAge: 60000 } }))

// Access the session as req.session
app.get('/', function(req, res, next) {
    if (req.session.views) {
        req.session.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})
req.session.regenerate(function(err) {
    // will have a new session here
})
req.session.destroy(function(err) {
    // cannot access session here
})
req.session.save(function(err) {
    // session saved
})
var hour = 3600000
req.session.cookie.expires = new Date(Date.now() + hour)
req.session.cookie.maxAge = hour
req.session.cookie.maxAge // => 30000