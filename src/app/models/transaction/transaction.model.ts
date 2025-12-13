export interface Transaction {
  id: string;                
  orderId: string;            
  transactionNumber: string;
  orderNumber: string;
  providerReference: string;
  status: 'Success' | 'Failed' | 'Pending';
  amount: number;
  createdOn: string;    
  updatedOn: string;        
}
