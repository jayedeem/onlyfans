const { ApolloServer } = require('apollo-server')
const express = require('express')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const dotenv = require('dotenv').config()
const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo DB Connected')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
