export const queries = `#graphql
    getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
    getUser(email: String!): User
    getProfile(id: String!): User
`;
