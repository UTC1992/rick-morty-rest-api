import cors from 'cors';
import express, { Application } from 'express';

import {environment} from '../config/default';
import { dbConnection } from '../database/databaseConfig';
import routerAuth from '../routes/auth.routes';
import routerCharacter from '../routes/character.routes';
import routerUser from '../routes/user.routes';



class Server {
  public app: Application

  private port: string;

  constructor() {
    this.app = express();
    this.port = environment.PORT || '8080';
    this.connectDB();
    this.middleware()
    this.routes();
  }

  // eslint-disable-next-line class-methods-use-this
  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middleware(): void {
    this.app.use( cors())
    this.app.use( express.json());
  }

  routes(): void {
    this.app.use( '/api/user', routerUser );
    this.app.use( '/api/auth', routerAuth );
    this.app.use( '/api/character', routerCharacter );
  }

  listen(): void {
    this.app.listen( this.port, () => {
      console.log( `Server run in port !! ${this.port}` );
    });
  }
}

export default Server;
