import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../models/transaction/transaction.model';
import { TransactionService } from '../../services/transaction/transaction-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-transactions-component',
  standalone: false,
  templateUrl: './transactions-component.html',
  styleUrl: './transactions-component.scss',
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = [
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
  hasError = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.hasError = false;
    this.errorMessage = '';

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
      error: () => {
        this.loading = false;
        this.transactions = [];
        this.totalRecords = 0;
        this.hasError = true;
        this.errorMessage = 'Server not reachable. Please try again later.';
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  onSearch(): void {
    this.page = 1;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.load();
  }

  onSort(sort: Sort): void {
    if (!sort.direction) return;

    this.sortBy = sort.active;
    this.isDescending = sort.direction === 'desc';
    this.page = 1;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.load();
  }

}
