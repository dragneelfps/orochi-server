const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//graphql config
const typeDefs = require('./graphql/type_defs')
const resolvers = require('./graphql/root_resolvers')


//Initialize schema 
require('./models/schema')

//Initialize auth config
const authConfig = require('./services/auth')

//Mongo db config
const MONGO_URI = 'mongodb://drag:pass1234@ds058048.mlab.com:58048/orochi'
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab: ' + error))


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

const app = express()
const port = process.env.PORT || 4000

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'lucifer',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

apolloServer.applyMiddleware({
  app
})

app.listen(port, () => console.log(`Running at ${port}. Graphql running at ${apolloServer.graphqlPath}`))