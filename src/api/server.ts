import express, { Application } from 'express';

import {environment} from '../config/default';
import { dbConnection } from '../database/databaseConfig';

class Server {
  private app: Application

  private port: string;

  constructor() {
    this.app = express();
    this.port = environment.PORT || '8080';

    this.connectDB();
  }

  // eslint-disable-next-line class-methods-use-this
  async connectDB(): Promise<void> {
    await dbConnection();
  }

  listen(): void {
    this.app.listen( this.port, () => {
      console.log( `Server run in port !! ${this.port}` );
    });
  }
}

export default Server;
