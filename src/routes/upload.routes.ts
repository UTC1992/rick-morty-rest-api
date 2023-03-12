import { Router } from 'express'
import { check } from 'express-validator'

import { uploadFile, getImage } from '../controllers/upload.controller';
import { validateExistUserById } from '../helpers/db-validator'

const routerUpload = Router()

routerUpload.post( '/:id',
  check( 'id', 'Id is not valid' ).isMongoId(),
  check( 'id' ).custom( validateExistUserById )
  , uploadFile )

routerUpload.get( '/:id', getImage )

export default routerUpload
