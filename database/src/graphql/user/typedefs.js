export const typeDefs = `#graphql
  type User {
    id: String!
    username: String!
    fname: String!
    lname: String
    email: String!
    bio: String!
    profileImageUrl: String 
    website_url: String
    location: String
    birth_date: String
    followers: [String]
    following: [String]
  }
`;