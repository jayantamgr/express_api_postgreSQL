const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.use(cors())

app.get('/', (request, response) => {
   response.json({ info: 'RESTful API for database queries for inactive users'})
})

app.get('/users', db.getUsers)
app.get('/twomonths', db.sixtyDaysInactive)
app.get('/onemonth', db.thirtyDaysInactive)
app.get('/week', db.sevenDaysInactive)
app.get('/twoweek', db.fourteenDaysInactive)

app.listen(port, () => {

   console.log(`App running on port ${port}.`)
})
