import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], key: string, order: 'asc' | 'desc'): any[] {
    if (key){
      let orderedList;
      if(order === 'asc'){
        orderedList = value.sort((a: any, b: any) => b[key].toString().localeCompare(a[key]));
      }else{
        orderedList =  value.sort((a: any, b: any) => a[key].toString().localeCompare(b[key]));
      }
      return orderedList;
    }
    else
      return value;
  }

}