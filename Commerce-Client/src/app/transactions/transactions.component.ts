import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../models/transaction';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { TransactionService } from '../services/transaction.service';
import * as XLSX from 'xlsx';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];

  constructor(private transactionService: TransactionService,private modalService: NgbModal) {
    this.getTransactions();

   }

  ngOnInit(): void {
  }
  openNewTransaction() {
    const modalRef = this.modalService.open(NewTransactionComponent);
  }

  // TODO Store logged in user's ID for getTransactions parameter
  getTransactions() {
    this.transactionService.getTransactions(GlobalVariables.loggedInUserId).subscribe(transaction => {
      this.transactions = transaction;
    });
  }

  export() {
    let ws: XLSX.WorkSheet;
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    let wsName: string;

    let acct1 = this.transactions[0].accountNumber;
    let transactions1: Transaction[] = new Array();
    let transactions2: Transaction[] = new Array();
    this.transactions.forEach(row => {
      row.accountNumber === acct1 ? transactions1.push(row) : transactions2.push(row);
    });
    ws = XLSX.utils.json_to_sheet(transactions1);
    wsName = 'Account# ' + acct1;
    XLSX.utils.book_append_sheet(wb, ws, wsName);
    ws = XLSX.utils.json_to_sheet(transactions2);
    wsName = 'Account# ' + transactions2[0].accountNumber;
    XLSX.utils.book_append_sheet(wb, ws, wsName);
    XLSX.writeFile(wb, 'User# ' + GlobalVariables.loggedInUserId + ' Transactions.xlsx');
  }

}
