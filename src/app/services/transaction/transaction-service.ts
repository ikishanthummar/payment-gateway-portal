import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResponse } from '../../models/common/paged-response.model';
import { Transaction } from '../../models/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl =
    `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  getPaged(
    page: number,
    pageSize: number,
    search = '',
    sortBy = '',
    isDescending = false
  ): Observable<PagedResponse<Transaction>> {

    let params = new HttpParams()
      .set('Page', page)
      .set('PageSize', pageSize)
      .set('Search', search)
      .set('SortBy', sortBy)
      .set('IsDescending', isDescending);

    return this.http.get<PagedResponse<Transaction>>(
      this.baseUrl,
      { params }
    );
  }

  getByTransactionNumber(txn: string) {
    return this.http.get<Transaction>(
      `${this.baseUrl}/by-transaction-number/${txn}`
    );
  }
}
