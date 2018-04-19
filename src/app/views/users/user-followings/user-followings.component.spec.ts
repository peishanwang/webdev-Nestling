import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingsComponent } from './user-followings.component';

describe('UserFollowingsComponent', () => {
  let component: UserFollowingsComponent;
  let fixture: ComponentFixture<UserFollowingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
