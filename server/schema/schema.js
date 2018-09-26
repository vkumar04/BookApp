const graphQL = require('graphql')

const {GraphQLSchema, GraphQLObjectType, GraphQLString} = graphQL

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
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery})