export const errorsUserValidate =  [
  {
    msg: 'The name is required',
    param: 'fullName',
    location: 'body'
  },
  {
    msg: 'The name is required',
    param: 'nickname',
    location: 'body'
  },
  {
    msg: 'The name is required',
    param: 'email',
    location: 'body'
  },
  {
    msg: 'The password should have more than 6 characters',
    param: 'password',
    location: 'body'
  }
]

export const errorsUserUniqueField = [
  {
    value: 'Demo123',
    msg: 'The nickname Demo123, already is created.',
    param: 'nickname',
    location: 'body'
  },
  {
    value: 'demo@gmail.com',
    msg: 'The email demo@gmail.com, already is created.',
    param: 'email',
    location: 'body'
  }
]
