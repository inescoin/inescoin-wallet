// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerChatComponent } from './messenger-chat.component';

describe('MessengerChatComponent', () => {
  let component: MessengerChatComponent;
  let fixture: ComponentFixture<MessengerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
