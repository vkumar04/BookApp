const graphQL = require('graphql')
const _ = require('lodash')
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = graphQL

//dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: 1
  }, {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: 2
  }, {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: 3
  }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    }
  }),
  resolve(parent, args) {}
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        // get data from db
        return _.find(books, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery})