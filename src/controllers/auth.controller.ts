/* eslint-disable import/no-extraneous-dependencies */
import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';

import { generateJWT } from '../helpers/generate-jwt';
import { UserModel } from '../models/user.model';

export interface IAuthData {
  email: string
  password: string
}

export const login = async ( req: Request, res: Response ): Promise<Response> => {
  try {
    const { email, password } = req.body as IAuthData

    const user = await UserModel.findOne({email})

    if ( !user ) {
      return res.status( 400 ).json({
        msg: 'Email is not correct'
      })
    }

    const validPassword = bcryptjs.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status( 400 ).json({
        msg: 'Password is not correct'
      });
    }

    const token = await generateJWT( user.id )

    return res.status( 200 ).json({
      status: 'success',
      data: {
        user,
        token
      }
    })
    
  } catch ( error ) {
    return res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}
