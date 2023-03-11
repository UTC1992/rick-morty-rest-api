// eslint-disable-next-line import/no-extraneous-dependencies
import bcryptjs from 'bcryptjs';
import {Request, Response} from 'express';

import { IUser, UserModel } from '../models/user.model';

export const createUser = async ( req: Request, res: Response ): Promise<void> => {
  const { fullName, nickname, email, password } = req.body as IUser
  const user = new UserModel({ fullName, nickname, email, password })

  const encryptedPass = bcryptjs.genSaltSync()

  user.password = bcryptjs.hashSync( password, encryptedPass )

  await user.save()

  res.status( 201 ).json({
    user
  })
}




