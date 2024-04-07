/**
 * GraphQL mutation string for registering a user.
 * @type {string}
 */
export const REGISTER = `mutation Register($email: String!, $password: String!) { register(email: $email, password: $password)}`

/**
 * GraphQL mutation string for logging in a user.
 * @type {string}
 */
export const LOGIN = `
  mutation LoginUser($email: String!, $password: String!) {loginUser(email: $email, password: $password) }
`

export const GET_API_KEY = `"query { getApiKey { key } }`
