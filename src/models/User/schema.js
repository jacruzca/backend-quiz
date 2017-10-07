
export default `
type User {
  id: Int!
  firstName: String
  lastName: String
  displayName: String
  email: String
  vehicles: [Vehicle]
}

type ProfitableUser {
   user: User!,
   spend: Int!
}

type Query {
  users: [User]
  user(id: Int!): User
  profitableUsers(top: Int!): [ProfitableUser]
}

type Mutation {
  deleteUser(input: DeleteUserInput!): DeleteUserPayload
}

input DeleteUserInput {
  id: Int!
}

type DeleteUserPayload {
  id: Int!
  error: String
}

`
