import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAllComponent } from './website-all.component';

describe('WebsiteAllComponent', () => {
  let component: WebsiteAllComponent;
  let fixture: ComponentFixture<WebsiteAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
