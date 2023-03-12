/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import supertest from 'supertest';

import Server from '../../api/server';
import { generateJWT } from '../../helpers/generate-jwt';
import { UserModel } from '../../models/user.model';

const server = new Server()
const api = supertest( server.app )

const userMock = {
  fullName: 'Demo',
  nickname: 'Demo123',
  email: 'demo@gmail.com',
  password: '123456'
}

const authDataMock = {
  email: 'demo@gmail.com',
  password: '123456'
}

const authDataIncorrectEmailMock = {
  email: 'demo-incorrect@gmail.com',
  password: '123456'
}

const authDataIncorrectPassMock = {
  email: 'demo@gmail.com',
  password: '12345678'
}

beforeEach( async() => {
  await UserModel.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe( 'Authentication', () => {
  describe( 'When the data is correct', () => {
    it( 'should return token with user', async () => {
      const user = await api.post( '/api/user' )
        .set( 'Accept', 'application/json' )
        .send( userMock )

      const {statusCode, body} = await api.post( '/api/auth' )
        .set( 'Accept', 'application/json' )
        .send( authDataMock )

      const token = await generateJWT( user.body.data.id )

      expect( statusCode ).toBe( 200 )
      expect( body.data.user ).toBeTruthy()
      expect( body.data.token ).toBeTruthy()
      expect( body.data.token ).toBe( token )
    });
  });

  describe( 'When the data is incorrect', () => {

    describe( 'EMAIL incorrect', () => {
      it( 'should return status 400 with message error', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )
  
        const {statusCode, body} = await api.post( '/api/auth' )
          .set( 'Accept', 'application/json' )
          .send( authDataIncorrectEmailMock )
  
        expect( statusCode ).toBe( 400 )
        expect( body.msg ).toBe( 'Email is not correct' )
      });
    });

    describe( 'PASSWORD incorrect', () => {
      it( 'should return status 400 with message error', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )
  
        const {statusCode, body} = await api.post( '/api/auth' )
          .set( 'Accept', 'application/json' )
          .send( authDataIncorrectPassMock )
  
        expect( statusCode ).toBe( 400 )
        expect( body.msg ).toBe( 'Password is not correct' )
      });
    });
  });
});
