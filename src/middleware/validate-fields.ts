import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validateFields = (
  // eslint-disable-next-line consistent-return
  req: Request, res: Response, next: NextFunction ) => {
  const errors = validationResult( req )

  if ( !errors.isEmpty()) {
    return res.status( 400 ).json( errors )
  }

  next()
  
}
