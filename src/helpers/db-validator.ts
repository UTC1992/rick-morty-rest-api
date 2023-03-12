import { UserModel } from '../models/user.model';

export const validateExistUserById = async( id: string ): Promise<void> => {
  const existUserById = await UserModel.findById( id );

  if ( !existUserById ) {
    throw new Error( `The user with id: ${ id }, doesn't exist.` );
  }
}
