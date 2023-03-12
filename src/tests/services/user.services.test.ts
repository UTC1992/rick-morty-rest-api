/* eslint-disable import/no-extraneous-dependencies */
import sinon from 'sinon'

import { UserModel } from '../../models/user.model';
import { saveUser } from '../../services/user.services';


const userPayLoad = {
  fullName: 'Demo',
  nickname: 'Demo123',
  email: 'demo@gmail.com',
  password: '123456'
}

const userResponse = {
  fullName: 'Demo',
  nickname: 'Demo123',
  email: 'demo@gmail.com',
  password: '123456',
  id: '1234567abcd3'
}


describe( 'User Services', () => {
  describe( 'Create a user', () => {
    it( 'should return the created user', async () => {
      sinon.stub( UserModel.prototype, 'save' ).returns( userResponse );
        
      const returnedUser = await saveUser( userPayLoad )

      expect( returnedUser ).toEqual( userResponse )

    });
  });
});
