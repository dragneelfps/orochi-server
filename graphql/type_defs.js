const {
  gql
} = require('apollo-server-express')

module.exports = gql `
  type User {
    id: ID
    email: String
    profiles: [Profile]
  }

  type Profile {
    id: ID
    username: String
    name: String
  }

  type Query {
    users: [User]
  }
`