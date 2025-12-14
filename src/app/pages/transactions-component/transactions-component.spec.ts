import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Transaction } from '../../models/transaction/transaction.model';
import { TransactionService } from '../../services/transaction/transaction-service';

@Component({
  selector: 'app-transactions-component',
  templateUrl: './transactions-component.html',
  styleUrl: './transactions-component.scss'
})
export class TransactionsComponent implements OnInit {

  displayedColumns = [
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

  constructor(private transactionService: TransactionService) {}

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
      error: () => {
        this.loading = false;
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
    this.paginator.firstPage();
    this.load();
  }

  onSort(sort: Sort): void {
    if (!sort.direction) return;

    this.sortBy = sort.active;
    this.isDescending = sort.direction === 'desc';

    this.page = 1;
    this.paginator.firstPage();
    this.load();
  }
}
