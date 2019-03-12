import { Component, HostListener } from '@angular/core';
import { TimeoutService } from './timeout/timeout.service';
import { MapPosition } from './locate-on-map/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  defaultMapPosition: MapPosition = {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  }

  constructor(private timoutSvc: TimeoutService){}

  title = 'ers-hachathon';
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  @HostListener('document:mouseover', ['$event'])

  resetTimer() {
    this.timoutSvc.notifyUserAction();
  }

  ontTimeOut(event){
    //alert(event);
  }
}
