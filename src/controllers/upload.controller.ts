/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { Request, Response } from 'express'

import { createMulter } from '../libs/multer-config';
import { UserModel } from '../models/user.model';

export const uploadFile = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { id } = req.params

    const multer = createMulter( id )
    const upload = multer.single( 'image' )
    let pathImage = ''

    upload( req, res, async ( err ) => {
      if ( err ) {
        console.log( err )
      } else {
        pathImage = req.file?.path || ''
        const user = await UserModel.findByIdAndUpdate( id, {image: pathImage} ,{new: true})
    
        res.status( 201 ).json({
          status: 'success',
          data: user
        })
      }
    })
  } catch ( error ) {
    console.log( error )
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}

export const getImage = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { id } = req.params
    const user = await UserModel.findById( id )
    const pathImage = path.join( __dirname, `../../${user?.image}` );

    res.status( 200 ).sendFile( pathImage );
  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}
