const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')

require('./models/schema')

const mongoDB = 'mongodb://drag:pass1234@ds058048.mlab.com:58048/orochi'
mongoose.connect(mongoDB, { useNewUrlParser: true })
const db = mongoose.connection

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