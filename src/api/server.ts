import express, { Application } from 'express';
import config from '../config/default';

class Server {
  private app: Application;

  private port: string;

  constructor() {
    this.app = express();
    this.port = config.PORT || '8080';
  }

  listen(): void {
    this.app.listen( this.port, () => {
      console.log( `Server run in port !! ${this.port}` );
    });
  }
}

export default Server;
