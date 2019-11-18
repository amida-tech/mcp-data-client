const { print } = require("graphql");

module.exports = class Logger {
  requestDidStart({ queryString, parsedQuery, variables }) {
    const query = queryString || print(parsedQuery);
    console.log(query);
    console.log(variables);
  }

  willSendResponse({ graphqlResponse }) {
    console.log(JSON.stringify(graphqlResponse, null, 2));
  }
};
