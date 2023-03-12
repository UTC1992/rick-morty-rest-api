/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'

import multer from 'multer';

const createStorage = ( filename: string ): multer.StorageEngine => {

  const storage = multer.diskStorage({
    destination: 'uploads',
    filename: ( req, file, cb ) => {
      cb( null, filename + path.extname( file.originalname ))
    }
  })

  return storage
}

export const createMulter = ( id: string ): multer.Multer => multer({storage: createStorage( id )})
