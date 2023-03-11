import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  PORT: process.env.PORT || '8080',
  DATABASE_NAME: process.env.DATABASE_NAME || '', 
};
