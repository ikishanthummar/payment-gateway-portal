import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment-service';
import { Router } from '@angular/router';
import { InitiatePaymentRequest } from '../../models/payment/initiate-payment-request.model';
import { Transaction } from '../../models/transaction/transaction.model';
import { PaymentProviderDDLView } from '../../models/payment/payment-providers-ddl.model';

@Component({
  selector: 'app-create-payment-component',
  standalone: false,
  templateUrl: './create-payment-component.html',
  styleUrl: './create-payment-component.scss',
})
export class CreatePaymentComponent implements OnInit {
  amount: number | null = null;
  providerReference: string = '';

  providers: PaymentProviderDDLView[] = [];
  loading = false;
  providersLoading = false;
  isNavigated = false;

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPaymentProviders();
  }

  loadPaymentProviders(): void {
    this.providersLoading = true;

    this.paymentService.getPaymentProviders().subscribe({
      next: (res) => {
        this.providers = res || [];

        if (this.providers.length > 0) {
          this.providerReference = this.providers[0].name;
        }

        this.providersLoading = false;
      },
      error: (err) => {
        console.error('Failed to load payment providers', err);
        this.providersLoading = false;
      }
    });
  }

  payNow(): void {
    this.amount = Math.max(1, Number(this.amount) || 0);
    if (this.loading || this.isNavigated) {
      return;
    }

    if (!this.amount || this.amount <= 0 || !this.providerReference) {
      return;
    }

    const request: InitiatePaymentRequest = {
      orderId: crypto.randomUUID(),
      amount: this.amount,
      providerReference: this.providerReference
    };

    this.loading = true;

    this.paymentService.initiatePayment(request).subscribe({
      next: (response: Transaction) => {
        if (this.isNavigated) return;

        this.isNavigated = true;
        this.loading = false;

        this.router.navigate(
          ['/payment-processing'],
          { state: { payment: response } }
        );
      },
      error: (err) => {
        console.error('Payment initiation failed', err);
        this.loading = false;
      }
    });
  }

  blockInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['e', 'E', '+', '-', ','];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
