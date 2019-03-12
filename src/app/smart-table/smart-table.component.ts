import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {

  @ViewChild('jsonToCSV') jsonToCSV: any;

  list: any[] = orderList;
  headers: any[] = headers;
  headerHover: string;
  toggleSort: boolean = false;
  order: 'asc' | 'desc';
  orderByKey: string;
  pagination;
  pagedData: any = [];
  toggleSettings: boolean = false;
  toggleExport: boolean = false;
  filteredHeader: any[] = [];
  tableStyles: any[] = tableStyle;
  tStyle: string = 'basic';
  textAligns: any[] = aligns;
  textAlign: string = 'center';
  headerType: string = '';
  tableThemes:any[] = themes;
  tableTheme: string = 'themeLight';
  csvOptions: any = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: false,
    title: '',
    useBom: false,
    removeNewLines: true,
    keys: []
  };

  exportAsConfig: any = {
    exportToImage: {
      type: 'png',
      elementId: 'smartTable'
    },
    exportToDoc: {
      type: 'docx',
      elementId: 'smartTable',
      options: {
        orientation: 'landscape',
        margins: {
          top: '20'
        }
      }
    },
    exportToPdf: {
      type: 'pdf',
      elementId: 'smartTable',
      options: {
        orientation: 'landscape',
        margins: {
          top: '20'
        }
      }
    }
  }

  constructor( private cdRef : ChangeDetectorRef, private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.filteredHeader = this.headers.filter( header => header.checked );
    this.updateCsvHeaders(headers);
  }

  displaySortArrow(hKey: string){
    this.headerHover = hKey;
  }

  onSort(cKey){
    this.toggleSort = !this.toggleSort;
    this.order = this.toggleSort ? 'asc' : 'desc';
    this.orderByKey = cKey;
  }

  onItemPerPageChange(event){
    this.pagination = event;
    this.pagedData = this.list.slice(event.dataFrom - 1, event.dataTo);
    this.cdRef.detectChanges();
  }

  openForm() {
    this.toggleSettings = !this.toggleSettings;
    if(this.toggleSettings){
      this.toggleExport = false;
    }
  }

  openExportPopUp(){
    this.toggleExport = !this.toggleExport;
    if(this.toggleExport){
      this.toggleSettings = false;
    }
  }

  toggleHeaderColumn(header){
    this.filteredHeader = this.headers.filter( header => header.checked );
    this.headers = this.headers.filter(h => { 
      if(header.key === h.key){
        h.checked = !header.checked; 
      }
      return h;
      });
    this.updateCsvHeaders(this.headers);
  }

  updateCsvHeaders(headers){
    let csvHeaderKeys = []
    let csvHeadervalues = []
    headers.forEach(element => {
      if(element.checked){
        csvHeaderKeys.push(element.key); 
        csvHeadervalues.push(element.value);
      }
    });
    this.csvOptions.keys = csvHeaderKeys;
    this.csvOptions.headers = csvHeadervalues;
  }

  onExportToCSV(){
    this.jsonToCSV.onDownload();
  }

  onExport(exportType) {
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig[exportType], 'Export_to_Image');
  }
}

export const themes = [{
  key: 'themeDark',
  value: 'Dark'
},{
  key: 'themeLight',
  value: 'Light'
},{
  key: 'themeLightBlue',
  value: 'Light Blue'
}];

export const aligns = [{
  key: 'left',
  value: 'Left'
},{
  key: 'right',
  value: 'Right'
},{
  key: 'center',
  value: 'Center'
}];

export const tableStyle = [{
  key: 'basic',
  value: 'Basic'
},{
  key: 'bordered',
  value: 'Bordered'
},{
  key: 'hover',
  value: 'Hover Rows'
},{
  key: 'stripped',
  value: 'Stripped'
}];

export const headers = [{
  key: 'accessioningId',
  value: 'Accessioning Id',
  checked: true
},{
  key: 'orderId',
  value: 'Order Id',
  checked: true
},{
  key: 'workflowType',
  value: 'Workflow Type',
  checked: true
},{
  key: 'assaytype',
  value: 'Assay type',
  checked: true
},{
  key: 'workflowStatus',
  value: 'Workflow Status',
  checked: true
}];

export const orderList = [{
  "accessioningId": "123456781",
  "orderComments": null,
  "orderId": 10000030,
  "workflowType": "NA Extraction",
  "assaytype": "NIPTDPCR",
  "sampletype":"Plasma",
  "workflowStatus":"Pending",
  "flags":"F1,F2"
  
}, {
  "accessioningId": "123456782",
  "orderComments": null,
  "orderId": 10000031,
  "workflowType": "LP Pre-PCR",
  "assaytype": "NIPTDPCR",
  "sampletype":"Plasma",
  "workflowStatus":"completed",
  "flags":""
},{
  "accessioningId": "123456783",
  "orderComments": null,
  "orderId": 10000032,
  "workflowType": "LP Post PCR",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"in progress",
  "flags":"F1"
},{
  "accessioningId": "123456784",
  "orderComments": null,
  "orderId": 10000033,
  "workflowType": "Sequencing",
  "assaytype": "NIPTDPCR",
  "sampletype":"Plasma",
  "workflowStatus":"error",
  "flags":"F1"
},{
  "accessioningId": "123456785",
  "orderComments": null,
  "orderId": 10000034,
  "workflowType": "Sequencing Prep",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"warning",
  "flags":"F1"
},{
  "accessioningId": "123456786",
  "orderComments": null,
  "orderId": 10000035,
  "workflowType": "NA Extraction",
  "assaytype": "NIPTDPCR",
  "sampletype":"Plasma",
  "workflowStatus":"completed",
  "flags":"F1"
},{
  "accessioningId": "123456787",
  "orderComments": null,
  "orderId": 10000036,
  "workflowType": "LP Pre-PCR",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"IN progress",
  "flags":"F1"
},{
  "accessioningId": "123456787",
  "orderComments": null,
  "orderId": 10000036,
  "workflowType": "LP Post-PCR",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"IN progress",
  "flags":"F1"
},{
  "accessioningId": "123456787",
  "orderComments": null,
  "orderId": 10000036,
  "workflowType": "Lp Seq-Pep",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"Completed",
  "flags":"F1"
},{
  "accessioningId": "123456787",
  "orderComments": null,
  "orderId": 10000036,
  "workflowType": "Sequencing",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"IN progress",
  "flags":"F1"
},{
  "accessioningId": "123456787",
  "orderComments": null,
  "orderId": 10000036,
  "workflowType": "LP Post-PCR",
  "assaytype": "NIPTHTP",
  "sampletype":"Plasma",
  "workflowStatus":"IN progress",
  "flags":"F1"
},
{"accessioningId":"103","comments":"In workflow","orderId":10000162,"workflowType":"NA Extraction","assaytype":"NIPTDPCR","sampletype":"Plasma","workflowStatus":"Failed","flags":"F3"},
{"accessioningId":"101","comments":null,"orderId":10000160,"workflowType":"NA Extraction","assaytype":"NIPTDPCR","sampletype":"Plasma","workflowStatus":"Failed","flags":"F1,F2"},
{"accessioningId":"101","comments":null,"orderId":10000160,"workflowType":"NA Extraction","assaytype":"NIPTDPCR","sampletype":"Plasma","workflowStatus":"Aborted","flags":"F1,F2"},
{"accessioningId":"101","comments":null,"orderId":10000160,"workflowType":"Library Preparation","assaytype":"NIPTDPCR","sampletype":"Plasma","workflowStatus":"Failed","flags":null}
];