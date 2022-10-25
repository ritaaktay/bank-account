import { Deposit } from "./deposit";
import { Withdrawal } from "./withdrawal";
export class Account {
  constructor() {
    this.balance = () => {
      if (this.transactions.length == 0) return 0;
      else return this.transactions[this.transactions.length - 1].balance;
    };
    this.makeDeposit = (amount) => {
      const deposit = new Deposit(amount, this.balance());
      this.transactions.push(deposit);
    };
    this.makeWithdrawal = (amount) => {
      if (this.balance() < amount) throw Error("Insufficient funds");
      const withdrawal = new Withdrawal(amount, this.balance());
      this.transactions.push(withdrawal);
    };
    this.transactions = [];
  }
}
