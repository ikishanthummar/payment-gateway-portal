export interface Transaction {
  id: string;
  orderId: string;
  providerReference: string;
  amount: number;
  status: 'Pending' | 'Success' | 'Failed';
  updatedOn: string | null;
}