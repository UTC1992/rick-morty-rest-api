/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import supertest from 'supertest';

import Server from '../../api/server'
import { CharacterModel } from '../../models/character.model';

const server = new Server()
const api = supertest( server.app )

const characterMock = {
  image: 'http://web.com/image',
  name: 'Rick',
  ranking: 3,
  comment: 'Is a good character'
}

beforeEach( async() => {
  await CharacterModel.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe( 'Characters routes', () => {
  describe( 'POST /', () => {
    describe( 'When the POST is success', () => {
      it( 'should return 200 and character created', async () => {
        const {statusCode, body} = await api.post( '/api/character' )
          .set( 'Accept', 'application/json' )
          .send( characterMock )

        expect( statusCode ).toBe( 201 )
        expect( body.data.name ).toBe( 'Rick' )
      });
    });
  });

  describe( 'GET /', () => {
    describe( 'When the GET is success', () => {
      it( 'should return 200 and characters list', async () => {
        await api.post( '/api/character' )
          .set( 'Accept', 'application/json' )
          .send( characterMock )

        const {statusCode, body} = await api.get( '/api/character' )
          .set( 'Accept', 'application/json' )

        expect( statusCode ).toBe( 200 )
        expect( body.data ).toHaveLength( 1 )
      });
    });
  });

  describe( 'DELETE /', () => {
    describe( 'When the DELETE is success', () => {
      it( 'should return 200 and characters list', async () => {
        const response = await api.post( '/api/character' )
          .set( 'Accept', 'application/json' )
          .send( characterMock )
        
        const characterId = response.body.data.id

        if ( characterId ) {
          const {statusCode, body} = await api.delete( `/api/character/${characterId}` )
            .set( 'Accept', 'application/json' )
  
          expect( statusCode ).toBe( 200 )
          expect( body.status ).toBe( 'success' )
        }
      });
    });
  });
});
