import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, getUserById, updateUser, verifyExistEmail, verifyExistNickname } from '../controllers/user.controller';
import { validateExistUserById } from '../helpers/db-validator';
import { validateFields } from '../middleware/validate-fields';

const routerUser = Router()

routerUser.post( '/', [
  check( 'fullName', 'The name is required' ).not().isEmpty(),
  check( 'nickname', 'The name is required' ).not().isEmpty(),
  check( 'email', 'The name is required' ).isEmail(),
  check( 'password', 'The password should have more than 6 characters' ).isLength({ min: 6 }),
  validateFields,
], createUser )

routerUser.get( '/:id', [
  check( 'id', 'Id is not valid' ).isMongoId(),
  check( 'id' ).custom( validateExistUserById ),
  validateFields
], getUserById )

routerUser.put( '/:id', [
  check( 'id', 'Id is not valid' ).isMongoId(),
  check( 'id' ).custom( validateExistUserById ),
  check( 'fullName', 'The name is required' ).not().isEmpty(),
  check( 'nickname', 'The name is required' ).not().isEmpty(),
  validateFields
], updateUser )

routerUser.get( '/verify-exist-email/:email', verifyExistEmail )

routerUser.get( '/verify-exist-nickname/:nickname', verifyExistNickname )

export default routerUser
