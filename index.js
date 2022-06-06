const app = require('express')();
const authorize = require('./request.js')
const PORT = 8080


// listen
app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
    )
    
    app.get('/', (req, res) => {
        const {id, secret} = req.headers
        const key = authorize.fetch_authorization(id, secret)
        console.log(key)
        res.status(200).send(key)
})