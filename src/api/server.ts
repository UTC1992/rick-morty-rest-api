import cors from 'cors';
import express, { Application } from 'express';

import {environment} from '../config/default';
import { dbConnection } from '../database/databaseConfig';
import routerUser from '../routes/user.routes';



class Server {
  private app: Application

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
  }

  listen(): void {
    this.app.listen( this.port, () => {
      console.log( `Server run in port !! ${this.port}` );
    });
  }
}

export default Server;
