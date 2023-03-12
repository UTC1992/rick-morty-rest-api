/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import supertest from 'supertest';

import Server from '../../api/server';
import { UserModel } from '../../models/user.model';
import { errorsUserValidate, errorsUserUniqueField } from '../fixtures/errors.validation';

const server = new Server()
const api = supertest( server.app )

const userMock = {
  fullName: 'Demo',
  nickname: 'Demo123',
  email: 'demo@gmail.com',
  password: '123456'
}


beforeEach( async() => {
  await UserModel.deleteMany({})
})


afterAll(() => {
  mongoose.connection.close()
})

describe( 'User Routes', () => {
  describe( 'POST / Ok', () => {
    it( 'should create a user and return it', async () => {
      const {statusCode, headers, body} = await api.post( '/api/user' )
        .set( 'Accept', 'application/json' )
        .send( userMock )

      expect( statusCode ).toEqual( 201 )
      expect( headers['content-type']).toMatch( /json/ )
      expect( body.data.email ).toEqual( userMock.email )
      expect( body.status ).toBe( 'success' )
    });
  });

  describe( 'POST / validation form data', () => {
    describe( 'Validation fail without data', () => {
      it( 'should return array with 4 items and status 400', async () => {
        const {statusCode, body} = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send()
      
        expect( statusCode ).toEqual( 400 )
        expect( body.errors ).toHaveLength( errorsUserValidate.length )
      });
  
      it( 'should return array with errors', async () => {
        const {body} = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send()
      
        expect( body.errors ).toEqual( errorsUserValidate )
      });
    });
    
    describe( 'Validation when the email already exist', () => {
      it( 'should return status 400 add error email message', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        const {statusCode, body} = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        expect( statusCode ).toBe( 400 )
        expect( body.errors[1]).toEqual( errorsUserUniqueField[1])
      });
    });

    describe( 'Validation when the nickname already exist', () => {
      it( 'should return status 400 and error nickname message ', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        const {statusCode, body} = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        expect( statusCode ).toBe( 400 )
        expect( body.errors[0]).toEqual( errorsUserUniqueField[0])
      });
    });
  });
});
