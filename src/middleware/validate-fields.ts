import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = ( 
  // eslint-disable-next-line consistent-return
  req: Request, res: Response, next: NextFunction ): Response<any, Record<string, any>> | void => {
  const errors = validationResult( req )

  if ( !errors.isEmpty()) {
    return res.status( 400 ).json( errors )
  }

  next()
  
}
