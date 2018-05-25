const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , ctrl = require('./ctrl')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
const port = 5678
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(port, () => console.log(`server is listening on port ${port}`))
})

app.get('/api/products', ctrl.getAll)
app.post('/api/products', ctrl.addProduct)
app.delete('/api/products/:id', ctrl.deleteProduct)
app.put('/api/products/:id', ctrl.editProduct)
