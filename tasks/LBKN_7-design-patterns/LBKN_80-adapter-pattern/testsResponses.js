const testResponseInSnakeCase = [
  {
    id: 1,
    user_name: 'Александр',
    email_address: 'sanya@sanya.com',
    user_role_admin: true,
  },
  {
    id: 2,
    user_name: 'Петр',
    email_address: 'petya@petya.com',
    user_role_admin: false,
  },
]

const testResponseInKebabCase = [
  {
    'id': 1,
    'user-name': 'Александр',
    'email-address': 'sanya@sanya.com',
    'user-role-admin': true,
  },
  {
    'id': 2,
    'user-name': 'Петр',
    'email-address': 'petya@petya.com',
    'user-role-admin': false,
  },
]

const testResponseInUpperSnakeCase = [
  {
    ID: 1,
    USER_NAME: 'Александр',
    EMAIL_ADDRESS: 'sanya@sanya.com',
    USER_ROLE_ADMIN: true,
  },
  {
    ID: 2,
    USER_NAME: 'Петр',
    EMAIL_ADDRESS: 'petya@petya.com',
    USER_ROLE_ADMIN: false,
  },
]

module.exports = { testResponseInSnakeCase, testResponseInKebabCase, testResponseInUpperSnakeCase };
