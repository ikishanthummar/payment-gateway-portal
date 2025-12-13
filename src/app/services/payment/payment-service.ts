import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { InitiatePaymentRequest } from '../../models/payment/initiate-payment-request.model';
import { Transaction } from '../../models/transaction/transaction.model';
import { PaymentProviderDDLView } from '../../models/payment/payment-providers-ddl.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseUrl =
    `${environment.apiBaseUrl}/payments`;

  constructor(private http: HttpClient) { }

  initiatePayment(req: InitiatePaymentRequest): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.baseUrl}/initiate`,
      req
    );
  }

  getPaymentProviders(): Observable<PaymentProviderDDLView[]> {
    return this.http.get<PaymentProviderDDLView[]>(
      `${this.baseUrl}/payment-providers`
    );
  }
}
