type Transaction = {
  amount: number;
  date: Date;
  balance: number;
  type: "deposit" | "withdrawal";
};

type TransactionCreator = {
  (amount: number, balance: number): Transaction;
};
