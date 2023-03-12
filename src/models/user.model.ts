import { model, Schema } from 'mongoose';

interface IUser {
  fullName: string
  nickname: string
  email: string
  password: string
  image?: string
}


const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'The name is required'],
  },
  nickname: {
    type: String,
    required: [true, 'The nickname is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true,  'The email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  },
  image: {
    type: String,
    required: [false]
  }
})

userSchema.methods.toJSON = function modifyObject() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, password, _id, ...user } = this.toObject();

  user.id = _id;

  return user;
}

const UserModel = model( 'User', userSchema )

export {
  UserModel,
  IUser
}
