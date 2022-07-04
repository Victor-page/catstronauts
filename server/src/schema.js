const { gql } = require('apollo-server');

const typeDefs = gql`
  type Module {
    id: ID!
    title: String!
    length: Int
    content: String
    videoUrl: String
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }

  type Query {
    tracksForHome: [Track!]!
    tracksForHomeFetch: [Track!]!
    track(id: ID!): Track!
    module(id: ID!): Module!
  }
`;

module.exports = typeDefs;
