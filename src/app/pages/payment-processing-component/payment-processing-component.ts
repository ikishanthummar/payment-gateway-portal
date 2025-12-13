import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../../models/transaction/transaction.model';

@Component({
  selector: 'app-payment-processing-component',
  standalone: false,
  templateUrl: './payment-processing-component.html',
  styleUrl: './payment-processing-component.scss',
})
export class PaymentProcessingComponent implements OnInit {

  payment!: Transaction;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.payment = history.state?.payment;

    if (!this.payment) {
      this.router.navigate(['/transactions']);
      return;
    }

    setTimeout(() => {
      this.router.navigate(
        ['/payment-result'],
        { state: { payment: this.payment } }
      );
    }, 3000);
  }
}