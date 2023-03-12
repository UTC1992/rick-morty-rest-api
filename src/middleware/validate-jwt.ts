import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { environment } from '../config/default';
import { UserModel } from '../models/user.model';

export const validateJWT = async (
  req: Request, res: Response, next: NextFunction ): Promise<Response | void> => {
  
  const token = req.header( 'jwt-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      msg: 'Missing token'
    });
  }

  try {

    const dataToken = jwt.verify( token, environment.SECRET_OR_PRIVATE_KEY );
    let idUser = ''

    if ( typeof dataToken !== 'string' ) {
      idUser = dataToken.id
    }
    const user = await UserModel.findById( idUser );

    if ( !user ) {
      return res.status( 401 ).json({
        msg: 'Token invalid - User does not exist in DB'
      });
    }

    next()
  } catch ( error ) {
    res.status( 401 ).json({
      msg: 'Token invalid',
    });
  }
}
