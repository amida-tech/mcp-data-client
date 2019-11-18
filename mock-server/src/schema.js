const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    rating(facts: [Fact]!): Rating
  }

  type Rating {
    value: Float
  }

  input Fact {
    identifier: String
    value: String
  }
`;

module.exports = typeDefs;
