const express = require('express')
const graphQLURL = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')

const app = express()

//connect to mlab
mongoose.connect('mongodb://vick:asdf1234@ds249269.mlab.com:49269/bookapp', {useNewUrlParser: true})
mongoose
  .connection
  .once('open', () => {
    console.log('connected to db')
  })

app.use('/graphql', graphQLURL({schema, graphiql: true}))

app.listen(4000, () => {
  console.log('listening to port 4000')
})