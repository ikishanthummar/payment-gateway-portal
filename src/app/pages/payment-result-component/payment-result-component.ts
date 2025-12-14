import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../../models/transaction/transaction.model';
import { TransactionService } from '../../services/transaction/transaction-service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-result-component',
  standalone: false,
  templateUrl: './payment-result-component.html',
  styleUrl: './payment-result-component.scss',
})
export class PaymentResultComponent implements OnInit, OnDestroy {

  payment!: Transaction;
  pollingSub!: Subscription;

  elapsedSeconds = 0;
  timerSub!: Subscription;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) { }


  ngOnInit(): void {
    this.payment = history.state?.payment;

    if (!this.payment) {
      this.router.navigate(['/transactions']);
      return;
    }

    this.timerSub = interval(1000).subscribe(() => {
      this.elapsedSeconds++;
    });

    this.pollingSub = interval(3000).subscribe(() => {
      this.transactionService
        .getByTransactionNumber(this.payment.transactionNumber)
        .subscribe(txn => {
          this.payment.status = txn.status;

          if (txn.status !== 'Pending') {
            this.pollingSub.unsubscribe();

            setTimeout(() => {
              this.router.navigate(['/transactions']);
            }, 2000);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }

  goToTransactions(): void {
    this.router.navigate(['/transactions']);
  }
}
