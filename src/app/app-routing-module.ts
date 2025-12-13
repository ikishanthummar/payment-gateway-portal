import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './pages/transactions-component/transactions-component';
import { CreatePaymentComponent } from './pages/create-payment-component/create-payment-component';
import { PaymentProcessingComponent } from './pages/payment-processing-component/payment-processing-component';
import { PaymentResultComponent } from './pages/payment-result-component/payment-result-component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full'
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'pay',
    component: CreatePaymentComponent
  },
  {
    path: 'payment-processing',
    component: PaymentProcessingComponent
  },
  {
    path: 'payment-result',
    component: PaymentResultComponent
  },
  {
    path: '**',
    redirectTo: 'transactions'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
