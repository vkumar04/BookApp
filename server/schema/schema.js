const graphQL = require('graphql')
const _ = require('lodash')
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt} = graphQL

//dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: "1"
  }, {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: "2"
  }, {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: "3"
  }
]

const authors = [
  {
    name: 'Patrick Rothfuss',
    age: 44,
    id: '1'
  }, {
    name: 'Brandon Sanderson',
    age: 42,
    id: '2'
  }, {
    name: 'Terry Pratchett',
    age: 66,
    id: '3'
  }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
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

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    id: {
      type: GraphQLID
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // get data from db
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery})