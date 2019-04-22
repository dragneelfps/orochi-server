const { ApolloServer } = require('apollo-server-express')
const express = require('express')

const typeDefs = require('./graphql/type_defs')
const resolvers = require('./graphql/resolvers')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

const app = express()
const port = 4000

apolloServer.applyMiddleware({
  app
})

app.listen(port, () => console.log(`Running at ${port}. Graphql running at ${apolloServer.graphqlPath}`))