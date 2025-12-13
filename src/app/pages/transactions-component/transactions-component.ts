import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction/transaction.model';
import { TransactionService } from '../../services/transaction/transaction-service';

@Component({
  selector: 'app-transactions-component',
  standalone: false,
  templateUrl: './transactions-component.html',
  styleUrl: './transactions-component.scss',
})
export class TransactionsComponent implements OnInit  {
  transactions: Transaction[] = [];

  page = 1;
  pageSize = 5;
  totalCount = 0;

  search = '';
  sortBy = 'createdOn';
  isDescending = true;

  loading = false;

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
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.load();
  }

}
