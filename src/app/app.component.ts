import {Component, Renderer2} from '@angular/core';
import { ExcelReaderService } from './services/excel-reader.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-reader';

  datasheet$ = this.excelReader.datasheet$;
  datasheetTableInnerHTML: string = '';


  constructor(private excelReader: ExcelReaderService, private renderer: Renderer2){
      this.datasheet$.subscribe( datasheet => {
        const sheetName = datasheet.SheetNames[0];
        const sheet = datasheet.Sheets[sheetName];
        this.datasheetTableInnerHTML = XLSX.utils.sheet_to_html(sheet);
      })
  }

  readDatasheet(datasheet: XLSX.WorkSheet, range: XLSX.Range){
    for(var R = range.s.r; R <= range.e.r; ++R) {
      for(var C = range.s.c; C <= range.e.c; ++C) {
        var cell_address = {c:C, r:R};
        /* if an A1-style address is needed, encode the address */
        var cell_ref = XLSX.utils.encode_cell(cell_address);
      }
    }
  }

  onFileInputChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.item(0);
    if(file){
      this.excelReader.readFile(file);
    }
  }

  onTableClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if(element.tagName === 'TD'){
      this.renderer.addClass(element, 'border-red');
    }
  }

  sendDataToBackend(event: MouseEvent): void {
    this.excelReader.sendDataToBackend((event.target as HTMLElement).innerText).then( (data) => {
        this.showData(data);
    });
  }

  showData(data: string){
    window.alert(data);
  }
}
