import { ApolloServer } from "apollo-server-express";
import MS from "connect-mongo";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
const MongoStore = MS(session);

// graphql config
import resolvers from "./graphql/root_resolvers";
import typeDefs from "./graphql/type_defs";

// Initialize schema
import "./models/schema";

// Initialize auth config
import authConfig from "./services/auth";

// Mongo db config
const MONGO_URI = "mongodb://drag:pass1234@ds058048.mlab.com:58048/orochi";
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab: " + error));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const app = express();
const port = process.env.PORT || 4000;

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "lucifer",
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

apolloServer.applyMiddleware({
  app
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => console.log(`Running at ${port}. Graphql running at ${apolloServer.graphqlPath}`));
