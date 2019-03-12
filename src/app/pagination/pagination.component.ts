import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { DoCheck } from '@angular/core';
import { OnChanges } from '@angular/core';

export type PageInfo = {
  dataFrom?: number;
  dataTo?: number;
  dataLength?: number;
  itemsPerPage?: number;
}

export type PageNumber = {
  pageNumber: number;
  active: boolean;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() paginationStyle: 'number' | 'nextprev' = 'number';
  @Input() itemsPerPages: number[] = [5, 10, 25, 50, 100];
  @Input() nextPrevOption: 'opposite' | 'combine' = 'opposite';
  @Input() dataLength: number = 300;
  @Input() selectedItemsPerPage: number = 10;

  @Output() pageInfoChange: EventEmitter<PageInfo> = new EventEmitter();

  @ViewChild('itemPerPage') itemPerPage: ElementRef;

  pageInfo: PageInfo;
  pageNumbers: PageNumber[] = [];

  constructor() { }

  ngOnInit() {
    this.setPageInfo({dataFrom: 1, dataTo: this.selectedItemsPerPage, itemsPerPage: this.selectedItemsPerPage, dataLength: this.dataLength});
  }

  ngOnChanges(){
    this.setPageInfo({dataFrom: 1, dataTo: this.selectedItemsPerPage, itemsPerPage: this.selectedItemsPerPage, dataLength: this.dataLength});
    if(this.paginationStyle === 'number'){
      this.generatePageNumber();
    }
  }

  setItemsPerPage(itemsPerPage){
    // this.setItemsPerPage = itemsPerPage;
    this.setPageInfo({dataFrom: 1, dataTo: +itemsPerPage, dataLength: this.dataLength, itemsPerPage: +itemsPerPage});
  }

  setPageInfo(pageInfo: PageInfo){
    this.pageInfo = pageInfo;
    this.onPageInfoChange();
  }

  onPageInfoChange(){
    if(this.dataLength !== 0){
      this.pageInfoChange.emit(this.pageInfo);
    }
  }

  next(){
    this.pageInfo.dataFrom = this.pageInfo.dataFrom + this.pageInfo.itemsPerPage;
    this.pageInfo.dataTo = this.pageInfo.dataTo + this.pageInfo.itemsPerPage;

    this.setPageInfo({dataFrom: this.pageInfo.dataFrom, dataTo: this.pageInfo.dataTo, dataLength: this.dataLength, itemsPerPage: this.pageInfo.itemsPerPage});
  }

  prev(){
    this.pageInfo.dataFrom = this.pageInfo.dataFrom - this.pageInfo.itemsPerPage;
    this.pageInfo.dataTo = this.pageInfo.dataTo - this.pageInfo.itemsPerPage;

    this.setPageInfo({dataFrom: this.pageInfo.dataFrom, dataTo: this.pageInfo.dataTo, dataLength: this.dataLength, itemsPerPage: this.pageInfo.itemsPerPage});
  }

  pageNumberChange(pageNumber){
    this.pageInfo.dataFrom =  pageNumber === 1 ? pageNumber : this.pageInfo.dataTo;
    this.pageInfo.dataTo = this.pageInfo.dataFrom + this.pageInfo.itemsPerPage;
    this.activatePageNumber(pageNumber);
    this.setPageInfo({dataFrom: this.pageInfo.dataFrom, dataTo: this.pageInfo.dataTo, dataLength: this.dataLength, itemsPerPage: this.pageInfo.itemsPerPage});
  }

  activatePageNumber(pageNumber){
    this.pageNumbers = this.pageNumbers.filter(pageNum => {
      pageNum.active = pageNum.pageNumber === pageNumber ? true : false;
      return pageNum;
    });
  }

  generatePageNumber(){
    let pageNumberArray = [];
    let pageNumbers = this.dataLength/this.pageInfo.itemsPerPage;
    for(let i = 0; i < pageNumbers; i++){
      let pageNumber: PageNumber = {} as PageNumber;
      pageNumber.active = i === 0 ? true : false;
      pageNumber.pageNumber = i + 1;
      pageNumberArray.push(pageNumber);
    }
    this.pageNumbers = pageNumberArray;
  }
}
