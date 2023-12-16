import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifctionsComponent } from './notifctions.component';

describe('NotifctionsComponent', () => {
  let component: NotifctionsComponent;
  let fixture: ComponentFixture<NotifctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifctionsComponent]
    });
    fixture = TestBed.createComponent(NotifctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
