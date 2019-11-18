const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const Logger = require("./utils/logger");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  extensions: [() => new Logger()]
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
