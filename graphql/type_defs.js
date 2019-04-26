const {
  gql
} = require('apollo-server-express')

module.exports = gql`
  type User {
    _id: ID
    email: String
    profiles: [Profile]
  }

  type Profile {
    _id: ID
    username: String
    firstName: String
    middleName: String
    lastName: String
    profileImage: String
    aboutMe: String
    dob: String
    gender: String
    friends: [Friend]
  }

  type Friend {
    id: ID
    friend: Profile
    friendsSince: String
  }

  type Query {
    users: [User]
    currentUser: User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    logoutUser: User
  }
`