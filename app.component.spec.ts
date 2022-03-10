import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { ExcelReaderService } from './services/excel-reader.service';
import * as XLSX from 'xlsx';

describe('AppComponent', () => {

  const mockToolBarService = jasmine.createSpyObj(['datasheet$']);
  mockToolBarService.datasheet$ = new Subject<XLSX.WorkBook>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ { provide: ExcelReaderService, useValue: mockToolBarService } ]
    }).compileComponents();
  });

  it('should render table if worksheet is provided', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    mockToolBarService.datasheet$.next(exampleSheetJSObject);
    tick(10);
    fixture.detectChanges();
    const tableHTMLElement = document.querySelector('#table');
    expect(tableHTMLElement!.innerHTML).toContain('td');
  }));

  it('should NOT render table if worksheet is NOT provided', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let tableHTMLElement = document.querySelector('#table');
    expect(tableHTMLElement).toBeFalsy;
  }));

  it('should have 12 tds in table if there is 4x3 sheet provided', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    mockToolBarService.datasheet$.next(exampleSheetJSObject);
    tick(10);
    fixture.detectChanges();
    const tableHTMLElement = document.querySelector('#table');
    expect(tableHTMLElement!.querySelectorAll('td').length).toEqual(12);
  }));
});


const exampleSheetJSObject: XLSX.WorkSheet ={
  "SheetNames": [
      "Sheet1"
  ],
  "Sheets": {
      "Sheet1": {
          "A1": {
              "t": "s",
              "v": "Nazwa",
              "w": "Nazwa"
          },
          "B1": {
              "t": "s",
              "v": "Ludnosc",
              "w": "Ludnosc"
          },
          "C1": {
              "t": "s",
              "v": "Temperatura",
              "w": "Temperatura"
          },
          "A2": {
              "t": "s",
              "v": "Naleczow",
              "w": "Naleczow"
          },
          "B2": {
              "t": "n",
              "w": "1200",
              "v": 1200
          },
          "C2": {
              "t": "n",
              "w": "25.2",
              "v": 25.2
          },
          "A3": {
              "t": "s",
              "v": "Syberia",
              "w": "Syberia"
          },
          "B3": {
              "t": "n",
              "w": "60000",
              "v": 60000
          },
          "C3": {
              "t": "n",
              "w": "-70",
              "v": -70
          },
          "A4": {
              "t": "s",
              "v": "Alaska",
              "w": "Alaska"
          },
          "B4": {
              "t": "n",
              "w": "30000",
              "v": 30000
          },
          "C4": {
              "t": "n",
              "w": "0",
              "v": 0
          },
          "!ref": "A1:C4"
      }
  }
}
