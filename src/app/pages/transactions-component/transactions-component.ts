import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../models/transaction/transaction.model';
import { TransactionService } from '../../services/transaction/transaction-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-component',
  standalone: false,
  templateUrl: './transactions-component.html',
  styleUrl: './transactions-component.scss',
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'transactionNumber',
    'orderNumber',
    'providerReference',
    'amount',
    'status',
    'createdOn',
    'updatedOn'
  ];


  transactions: Transaction[] = [];

  page = 1;
  pageSize = 10;
  totalRecords = 0;
  search = '';
  sortBy = 'createdOn';
  isDescending = true;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.transactionService.getPaged(
      this.page,
      this.pageSize,
      this.search,
      this.sortBy,
      this.isDescending
    ).subscribe({
      next: res => {
        this.transactions = res.items;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

 onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

}
