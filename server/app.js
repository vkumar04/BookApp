const express = require('express')
const graphQLURL = require('express-graphql')

const app = express()

app.use('graphql', graphQLURL({}))

app.listen(4000, () => {
  console.log('listening to port 4000')
})