// eslint-disable-next-line import/no-extraneous-dependencies
import bcryptjs from 'bcryptjs';
import {Request, Response} from 'express';

import { IUser, UserModel } from '../models/user.model';
import { saveUser } from '../services/user.services';

export const createUser = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { fullName, nickname, email, password } = req.body as IUser
    const salt = bcryptjs.genSaltSync()

    const encryptedPassword = bcryptjs.hashSync( password, salt )

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

export const updateUser = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { id } = req.params
    const userData = req.body

    const user = await UserModel.findByIdAndUpdate( id, userData, {new: true})

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

export const verifyExistEmail = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { email } = req.params
    const user = await UserModel.findOne({email})

    res.status( 200 ).json({
      status: 'success',
      data: !!user
    })
  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}

export const verifyExistNickname = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { nickname } = req.params
    const user = await UserModel.findOne({nickname})

    res.status( 200 ).json({
      status: 'success',
      data: !!user
    })
  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}



