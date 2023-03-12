import { IUser, UserModel } from '../models/user.model';

export const saveUser = async ( userData: IUser ): Promise<IUser> => {
  const user = await new UserModel( userData ).save();

  return user;
}
