import dotenv from 'dotenv';


dotenv.config();

const { DATABASE, NODE_ENV, PORT, DATABASE_TEST} = process.env

export const environment = {
  PORT: PORT || '8080',
  DATABASE: ( NODE_ENV === 'test' ? DATABASE_TEST : DATABASE ) || '', 
};
