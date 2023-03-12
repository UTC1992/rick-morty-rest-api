// eslint-disable-next-line import/no-extraneous-dependencies
import bcryptjs from 'bcryptjs';
import {Request, Response} from 'express';

import { IUser, UserModel } from '../models/user.model';
import { saveUser } from '../services/user.services';

export const createUser = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { fullName, nickname, email, password } = req.body as IUser
    const encryptedPass = bcryptjs.genSaltSync()

    const encryptedPassword = bcryptjs.hashSync( password, encryptedPass )

    const user = await saveUser({ fullName, nickname, email, password: encryptedPassword })

    res.status( 201 ).json({
      status: 'success',
      data: user
    })

  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}

export const getUserById = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { id } = req.params
    const user = await UserModel.findById( id )

    res.status( 200 ).json({
      status: 'success',
      data: user
    })
  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}




