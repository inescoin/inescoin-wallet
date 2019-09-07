// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountComponent } from './wallet-account.component';

describe('WalletAccountComponent', () => {
  let component: WalletAccountComponent;
  let fixture: ComponentFixture<WalletAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
