import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller';

import { validateFields } from '../middleware/validate-fields';

const routerAuth = Router()

routerAuth.post( '/', [
  check( 'email', 'The name is required' ).isEmail(),
  check( 'password', 'The password should have more than 6 characters' ).isLength({ min: 6 }),
  validateFields,
], login )

export default routerAuth
