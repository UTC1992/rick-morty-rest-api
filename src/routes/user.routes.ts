import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, getUserById } from '../controllers/user.controller';
import { validateExistEmail, validateExistNickname, validateExistUserById } from '../helpers/db-validator';
import { validateFields } from '../middleware/validate-fields';

const routerUser = Router()

routerUser.post( '/', [
  check( 'fullName', 'The name is required' ).not().isEmpty(),
  check( 'nickname', 'The name is required' ).not().isEmpty(),
  check( 'nickname' ).custom( validateExistNickname ),
  check( 'email', 'The name is required' ).isEmail(),
  check( 'email' ).custom( validateExistEmail ),
  check( 'password', 'The password should have more than 6 characters' ).isLength({ min: 6 }),
  validateFields,
], createUser )

routerUser.get( '/:id', [
  check( 'id', 'Id is not valid' ).isMongoId(),
  check( 'id' ).custom( validateExistUserById ),
  validateFields
], getUserById )

export default routerUser
