const graphQL = require('graphql')
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphQL

//dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: "1",
    authorid: '1'
  }, {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: "2",
    authorid: '2'
  }, {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: "3",
    authorid: '3'
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
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId: parent.id})
      }
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
        return Book.findById(args.id)
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
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})
      }
    }
  }
})
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve(parent, {name, age}) {
        let author = new Author({name, age})
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        }
      },
      resolve(parent, {name, genre, authorId}) {
        let book = new Book({name, genre, authorId})
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})