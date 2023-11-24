import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;

  constructor() {
    this.socket = io.io(environment.PORT_URL, { transports: ['websocket'] });
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
