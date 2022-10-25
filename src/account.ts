import { Deposit } from "./deposit";
import { Withdrawal } from "./withdrawal";

export class Account {
  private deposit: typeof Deposit;
  private withdrawal: typeof Withdrawal;
  private transactions: (Deposit | Withdrawal)[];

  constructor(deposit: typeof Deposit, withdrawal: typeof Withdrawal) {
    this.deposit = deposit;
    this.withdrawal = withdrawal;
    this.transactions = [];
  }

  balance = (): number => {
    if (this.transactions.length == 0) return 0;
    else return this.transactions[this.transactions.length - 1].balance;
  };
}
