// eslint-disable-next-line import/no-extraneous-dependencies
import bcryptjs from 'bcryptjs';
import {Request, Response} from 'express';

import { IUser } from '../models/user.model';
import { saveUser } from '../services/user.services';

export const createUser = async ( req: Request, res: Response ): Promise<void> => {
  const { fullName, nickname, email, password } = req.body as IUser
  const encryptedPass = bcryptjs.genSaltSync()

  const encryptedPassword = bcryptjs.hashSync( password, encryptedPass )

  const user = await saveUser({ fullName, nickname, email, password: encryptedPassword })

  res.status( 201 ).json({
    status: 'success',
    data: user
  })
}




