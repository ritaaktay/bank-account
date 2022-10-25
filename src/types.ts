type Transaction = {
  amount: number;
  date: Date;
  balance: number;
  type: string;
};

type TransactionCreator = {
  (amount: number, balance: number): Transaction;
};
