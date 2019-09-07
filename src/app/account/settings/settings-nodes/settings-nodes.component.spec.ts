// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNodesComponent } from './settings-nodes.component';

describe('SettingsNodesComponent', () => {
  let component: SettingsNodesComponent;
  let fixture: ComponentFixture<SettingsNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
