import { Component, OnInit, ViewChild } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ModalActionService } from '../../_/components/modal-action/modal-action.service';

import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {


  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  contacts: any = [];

  rows = [];

  temp = [];

  columns = [
  ];

  subjects: any = {};

  constructor(private contactsService: ContactsService, private modalActionService: ModalActionService,) { }

  ngOnInit() {
  	this.contacts = this.contactsService.contacts || [];
    this.temp = this.contactsService.contacts && [...this.contactsService.contacts];

    this.subjects.contactsList = this.contactsService.onUpdated.subscribe(() => {

      this.contacts = [...this.contactsService.contacts];
      this.temp = [...this.contactsService.contacts];

      console.log('contacts', this.contacts, this.temp);
    });
  }

  public getRowIndex(row: any): number {
      return this.table.bodyComponent.getRowIndex(row);   // row being data object passed into the template
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(d);
      return d.label.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.contacts = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openQrCodeViewModal(contact) {
    this.modalActionService.open('qrCodeView', {
      component: 'contacts',
      contact: contact,
      size: 'lg'
    });
  }

  openContactCreateModal() {
    this.modalActionService.open('contactAdd', {
      component: 'contacts',
      size: 'lg'
    });
  }

  openContactEditModal(contact) {
    this.modalActionService.open('contactEdit', {
      component: 'contacts',
      contact: contact,
      size: 'lg'
    });
  }

  openContactRemoveModal(contact, index) {
    this.modalActionService.open('contactRemove', {
      component: 'contacts',
      contact: contact,
      index: index
    });
  }

  ngOnDestroy() {
    this.subjects.contactsList && this.subjects.contactsList.unsubscribe();
  }
}
