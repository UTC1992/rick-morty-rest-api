/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import supertest from 'supertest';

import Server from '../../api/server';
import { UserModel } from '../../models/user.model';
import { errorsUserValidate, errorsUserId } from '../fixtures/errors.validation';

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
  describe( 'POST /', () => {
    describe( 'When the POST is success', () => {
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

    describe( 'Validation data', () => {
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
    });
  });

  describe( 'GET /:id', () => {
    describe( 'When the GET is success', () => {
      it( 'should return status 200 and user data', async () => {
        const response = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )
        
        const userAdded = response.body.data
  
        const {statusCode, body} = await api.get( `/api/user/${userAdded.id}` )
          .set( 'Accept', 'application/json' )
        
        expect( statusCode ).toBe( 200 )
        expect( body.data ).toEqual( userAdded )
      });
    });
    describe( 'Validation params', () => {
      describe( 'Validation fail when the id is invalid', () => {
        it( 'should return status 400 and message', async() => {
          const {statusCode, body} = await api.get( `/api/user/abc` )
            .set( 'Accept', 'application/json' )

          expect( statusCode ).toBe( 400 )
          expect( body.errors ).toHaveLength( errorsUserId.length )
          expect( body.errors[0].msg ).toEqual( errorsUserId[0].msg )
        });
      });

      describe( 'Validation fail when the User by id does not exist', () => {
        it( 'should return status 400 with a message', async() => {
          const {statusCode, body} = await api.get( `/api/user/640d3c980ecbf41c165bb8ce` )
            .set( 'Accept', 'application/json' )
  
          expect( statusCode ).toBe( 400 )
          expect( body.errors[0]).toEqual( errorsUserId[1])
          
        });
      });
    });
  });

  describe( 'PUT /:id', () => {
    describe( 'When the PUT is success', () => {
      it( 'should return status 200 and user updated', async() => {
        const response = await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )
        
        const userAdded = response.body.data
        
        const userToEdit = {
          fullName: 'Demo',
          nickname: 'Demo123', 
          email: 'demonew@gmail.com',
          password: '123456',
        }

        const {statusCode, body} = await api.put( `/api/user/${userAdded.id}` )
          .set( 'Accept', 'application/json' )
          .send( userToEdit )

        expect( statusCode ).toBe( 200 )
        expect( body.data.email ).toEqual( userToEdit.email )
        
      });
    });
  });

  describe( 'GET /verify-exist-email/:email', () => {
    describe( 'Validation when the email already exist', () => {
      it( 'should return status 200 and value', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        const {statusCode, body} = await api.get( `/api/user/verify-exist-email/${userMock.email}` )
          .set( 'Accept', 'application/json' )

        expect( statusCode ).toBe( 200 )
        expect( body.data ).toBe( true )
      });
    });
  });

  describe( 'GET /verify-exist-nickname/:nickname', () => {
    describe( 'Validation when the nickname already exist', () => {
      it( 'should return status 200 and value ', async () => {
        await api.post( '/api/user' )
          .set( 'Accept', 'application/json' )
          .send( userMock )

        const {statusCode, body} = await api.get( `/api/user/verify-exist-nickname/${userMock.nickname}` )
          .set( 'Accept', 'application/json' )

        expect( statusCode ).toBe( 200 )
        expect( body.data ).toBe( true )
      });
    });
  });
});
