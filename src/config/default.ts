import dotenv from 'dotenv';


dotenv.config();

const { DATABASE, NODE_ENV, PORT, DATABASE_TEST, SECRET_OR_PRIVATE_KEY, TIME_EXPIRES_JWT} = process.env

export const environment = {
  PORT: PORT || '8080',
  DATABASE: ( NODE_ENV === 'test' ? DATABASE_TEST : DATABASE ) || '',
  SECRET_OR_PRIVATE_KEY: SECRET_OR_PRIVATE_KEY || 'secret', 
  TIME_EXPIRES_JWT: TIME_EXPIRES_JWT || '1h'
};
