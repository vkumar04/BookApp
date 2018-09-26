const express = require('express')
const graphQLURL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('graphql', graphQLURL({schema}))

app.listen(4000, () => {
  console.log('listening to port 4000')
})