import { Deposit } from "./deposit";
import { Withdrawal } from "./withdrawal";

export class Account {
  public transactions: (Deposit | Withdrawal)[];

  constructor() {
    this.transactions = [];
  }

  balance = (): number => {
    if (this.transactions.length == 0) return 0;
    else return this.transactions[this.transactions.length - 1].balance;
  };

  makeDeposit = (amount: number) => {
    const deposit = new Deposit(amount, this.balance());
    this.transactions.push(deposit);
  };

  makeWithdrawal = (amount: number) => {
    if (this.balance() < amount) throw Error("Insufficient funds");
    const withdrawal = new Withdrawal(amount, this.balance());
    this.transactions.push(withdrawal);
  };
}
