import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteOtherComponent } from './website-other.component';

describe('WebsiteOtherComponent', () => {
  let component: WebsiteOtherComponent;
  let fixture: ComponentFixture<WebsiteOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
