const customerResolvers = require('./Customer')
const userResolvers = require('./User')
module.exports = {
  Query: {
    ...customerResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  }
}
