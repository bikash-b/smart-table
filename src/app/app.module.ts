import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { OrderByPipe } from './smart-table/order-by.pipe';
import { FilterByPipe } from './smart-table/filter-by.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { LocateOnMapComponent } from './locate-on-map/locate-on-map.component';
import { Angular2CsvModule } from 'angular2-csv';
import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [
    AppComponent,
    SmartTableComponent,
    OrderByPipe,
    FilterByPipe,
    PaginationComponent,
    TimeoutComponent,
    LocateOnMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Angular2CsvModule,
    ExportAsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
