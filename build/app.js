"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const MongoStore = connect_mongo_1.default(express_session_1.default);
// graphql config
const root_resolvers_1 = __importDefault(require("./graphql/root_resolvers"));
const type_defs_1 = __importDefault(require("./graphql/type_defs"));
// Initialize schema
require("./models/schema");
// Mongo db config
const MONGO_URI = "mongodb://drag:pass1234@ds058048.mlab.com:58048/orochi";
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true });
mongoose_1.default.connection
    .once("open", () => console.log("Connected to MongoLab instance."))
    .on("error", (error) => console.log("Error connecting to MongoLab: " + error));
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: type_defs_1.default,
    resolvers: root_resolvers_1.default,
    context: ({ req }) => ({ req }),
});
const app = express_1.default();
const port = process.env.PORT || 4000;
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: "lucifer",
    store: new MongoStore({
        url: MONGO_URI,
        autoReconnect: true
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
apolloServer.applyMiddleware({
    app
});
app.get("/", (req, res) => {
    res.send("Welcome");
});
app.listen(port, () => console.log(`Running at ${port}. Graphql running at ${apolloServer.graphqlPath}`));
