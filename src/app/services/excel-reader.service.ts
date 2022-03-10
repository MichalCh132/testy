import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  datasheet$ = new Subject<XLSX.WorkBook>();

  constructor() { }

  readFile(file: File): void {
    const fileReader = new FileReader();
    fileReader.onloadend = (event) => {
      const decodedFile = XLSX.read((event.target?.result));
      this.datasheet$.next(decodedFile);
      console.log(decodedFile);
    };
    const arrayBufferFile = fileReader.readAsArrayBuffer(file);
  }

  sendDataToBackend(data: string): Promise<string> {
    return new Promise<string>( resolve => {
      setTimeout( () => {
        resolve('Udalo sie otrzymac dane');
      }, 1500)
    })
  }
}
