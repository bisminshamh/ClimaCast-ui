/**
 * Mutation to add an item to the follow list.
 * @type {string}
 */
export const ADD_TO_FOLLOW = `mutation AddToFollow($email: String!, $item: String!) {
  addToFollow(email: $email, item: $item)
}`

/**
 * Mutation to remove an item from the follow list.
 * @type {string}
 */
export const REMOVE_FROM_FOLLOW = `mutation RemoveFromFollow($email: String!, $item: String!) {
  removeFromFollow(email: $email, item: $item)
}`

/**
 * Query to retrieve follow list by email.
 * @type {string}
 */
export const FOLLOW_BY_EMAIL = `query FollowByEmail($email: String!) {
  followByEmail(email: $email)
}`

/**
 * Mutation to add mail.
 * @type {string}
 */
export const ADD_MAIL = `mutation AddMail($email: String!, $emails: [String]!, $subject: String!) {
addMail(email: $email, emails: $emails, subject: $subject)
}`

/**
 * Query to retrieve emails and subject by email.
 * @type {string}
 */
export const GET_EMAILS_SUBJECTS = `query getEmailsAndSubject($email: String!) { getEmailsAndSubject(email: $email) { emails subject } }`
