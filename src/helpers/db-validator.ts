import { UserModel } from '../models/user.model';

export const validateExistEmail = async( email = '' ): Promise<void> => {
  const existEmail = await UserModel.findOne({ email });

  if ( existEmail ) {
    throw new Error( `The email ${ email }, already is created.` );
  }
}

export const validateExistNickname = async( nickname = '' ): Promise<void> => {
  const existNickname = await UserModel.findOne({ nickname });

  if ( existNickname ) {
    throw new Error( `The nickname ${ nickname }, already is created.` );
  }
}
