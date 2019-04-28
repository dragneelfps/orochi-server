import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID
    email: String
    profile: Profile
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
    friend: User
    friendsSince: String
  }

  input UserProfileInput {
    username: String!
    firstName: String!
    middleName: String
    lastName: String
    profileImage: String
    aboutMe: String
    dob: String
    gender: String
  }

  type Query {
    users: [User]
    currentUser: User
  }

  type Mutation {
    # User
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    logoutUser: User

    # User Profile
    createUserProfile(userProfileInput: UserProfileInput): Profile

  }
`;
