const viz = require('apollo-trace-viz')
const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient('https://fakerql.com/graphql', {
  headers: {
    'x-apollo-tracing': 1,
  },
})

client
  .rawRequest(
    `{
      allUsers {
        id
      }
      }`,
  )
  .then(data => viz(data))
  .catch(console.error)
