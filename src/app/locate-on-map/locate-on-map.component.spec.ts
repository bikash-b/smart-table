import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateOnMapComponent } from './locate-on-map.component';

describe('LocateOnMapComponent', () => {
  let component: LocateOnMapComponent;
  let fixture: ComponentFixture<LocateOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
