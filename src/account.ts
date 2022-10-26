import createDeposit from "./createDeposit";
import createWithdrawal from "./createWithdrawal";

export class Account {
  public transactions: Transaction[];
  private createDeposit: TransactionCreator;
  private createWithdrawal: TransactionCreator;

  constructor(deposit: TransactionCreator, withdrawal: TransactionCreator) {
    this.transactions = [];
    this.createWithdrawal = withdrawal;
    this.createDeposit = deposit;
  }

  getTransactions = (): Transaction[] => {
    return this.transactions;
  };

  balance = (): number => {
    if (this.transactions.length === 0) return 0;
    else return this.transactions[this.transactions.length - 1].balance;
  };

  makeDeposit = (amount: number) => {
    const deposit = this.createDeposit(amount, this.balance());
    this.transactions.push(deposit);
  };

  makeWithdrawal = (amount: number) => {
    if (this.balance() < amount) throw Error("Insufficient funds");
    const withdrawal = this.createWithdrawal(amount, this.balance());
    this.transactions.push(withdrawal);
  };
}
