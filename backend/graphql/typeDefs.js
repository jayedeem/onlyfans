const { gql } = require('apollo-server')

const typeDefs = gql`
  type RewardifyCustomer {
    currency: String!
    amount: String!
  }

  type Customer {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    state: String!
    tags: String!
  }

  type User {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    token: String!
  }

  type Query {
    getCustomers: [Customer]
  }
  type Mutation {
    rewardsInfo(userId: ID!): RewardifyCustomer!
    me(userId: ID!): Customer!
    login(username: String!, password: String!): User!
    addCredits(userId: ID!, amount: String!): String!
  }
`
module.exports = typeDefs

//3883214405763
