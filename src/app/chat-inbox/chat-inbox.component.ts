import { Component, OnInit } from '@angular/core';
import{ io} from 'socket.io-client';
import { CsvDataService } from '../cservice/csv-data.service';

const SOCKET_ENDPOINT = 'localhost:3000';

class CsvData{
  item1:string;
  item2:string;
}

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  socket:any;
  message:string;
  filteredData:CsvData[]=[];
  constructor(private csvService :CsvDataService) { }

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



  saveAsCSV() {
    if(this.filteredData.length > 0){
      const items: CsvData[] = [];

      this.filteredData.forEach(line => {
        let reportDate = new Date(report.date);
        let csvLine: CsvData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth()+1}/${reportDate.getFullYear()}`,
          laborerName: line.laborerName,
          machineNumber: line.machineNumber,
          machineName: line.machineName,
          workingHours: line.hours,
          description: line.description
        }
        items.push(csvLine); 
      });

      this.csvService.exportToCsv('myCsvDocumentName.csv', items);
    }

}
