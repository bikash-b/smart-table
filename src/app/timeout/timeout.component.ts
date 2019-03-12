import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { TimeoutService } from './timeout.service';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css']
})
export class TimeoutComponent implements OnDestroy, OnInit {

  @Input() timeLimit: number = 1000;

  @Output() timeOut: EventEmitter<string> = new EventEmitter();

  minutesDisplay = 0;
  secondsDisplay = 0;

  endTime = 1;

  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;

  constructor(private timeoutSvc: TimeoutService) {

  }

  ngOnInit() {
    this.resetTimer();
    this.timeoutSvc.userActionOccured.pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.resetTimer();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  resetTimer(endTime: number = this.endTime) {
    const interval = this.timeLimit;
    const duration = endTime * 60;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value =>
      this.render((duration - +value) * interval),
      err => { },
      () => {
        //this.authService.logOutUser();
        this.timeOut.emit('TIME_OUT');
      }
    )
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
