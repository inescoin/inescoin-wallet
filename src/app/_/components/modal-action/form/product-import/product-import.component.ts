import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActionService } from '../../modal-action.service';
import { WebService } from '../../../../../account/web/web.service';
import * as parseCsv from 'csv-parse/lib/sync';

@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.scss']
})
export class ProductImportComponent implements OnInit {
	csv: string  = '';
	parsed: any = [];
  products: any[] = [];

  constructor(
  	private ngbActiveModal: NgbActiveModal,
    private webService: WebService,
  	private modalActionService: ModalActionService,) { }

  ngOnInit() {
    this.products = this.modalActionService.options.products;
  }

  close() {
  	this.ngbActiveModal.close();
  }

  parse() {
  	let error = false;
  	try {
  		let pCsv: any = parseCsv;

	  	this.parsed = pCsv(this.csv, {
			  columns: true,
			  skip_empty_lines: true
			});
  	} catch(e) {
  		this.parsed = [];
  		error = true;
  	}

  	if (!error) {
	  	this.webService.onDomainProductsAdded.emit(this.parsed);
	    this.dismiss();
		}

  	console.log('parsed', this.parsed);
  }

  dismiss() {
  	this.ngbActiveModal.dismiss();
  }
}
