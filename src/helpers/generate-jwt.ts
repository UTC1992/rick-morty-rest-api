import jwt from 'jsonwebtoken'

import { environment } from '../config/default';

export const generateJWT = ( 
  id: string 
): Promise<Error | ( string | undefined )> => new Promise(( 
  resolve, reject 
) => {
  const payload = {id}

  jwt.sign( payload, environment.SECRET_OR_PRIVATE_KEY, {
    expiresIn: environment.TIME_EXPIRES_JWT
  }, ( error, token ) => {
    if ( error ) {
      reject( new Error( 'Error to generate JWT' ))
    } else {
      resolve( token )
    }
  })
})
