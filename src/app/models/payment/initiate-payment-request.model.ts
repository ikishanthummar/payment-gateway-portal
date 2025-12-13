export interface InitiatePaymentRequest {
  orderId: string;
  amount: number;
  providerReference: string;
}