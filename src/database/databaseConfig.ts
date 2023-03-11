import mongoose from 'mongoose'

import { environment } from '../config/default'

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect( environment.DATABASE_NAME )
    console.log( 'Database online' )
  } catch ( error ) {
    console.log( error )
    throw new Error( 'Error to init database' )
  }
}
