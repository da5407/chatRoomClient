import { Component, OnInit } from '@angular/core';
import{ io} from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  socket:any;
  message:string;
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, {
      withCredentials: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            "my-custom-header": "abcd"
          }
        }
      }
    });
    this.socket.on('message-broadcast',(data:string)=>{
      if(data){
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background ='white';
        element.style.padding='10px 30px';
        element.style.margin ='10px';
        document.getElementById('message-list').appendChild(element);
      }
    })
  }

  SendMessage(){
    this.socket.emit('message',this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background ='white';
    element.style.padding='10px 30px';
    element.style.margin ='10px';
    document.getElementById('message-list').appendChild(element);
this.message='';
  }
}
