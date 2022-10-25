import { Account } from "./account";
import { Withdrawal } from "./withdrawal";
import { Deposit } from "./deposit";

export class Statement {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  generate = (): string => {
    let statement = this.getHeader();
    statement += this.account.transactions
      .map((transaction) => this.formatTransaction(transaction))
      .join("\n");
    return statement;
  };

  getHeader = (): string => {
    return "date || credit || debit || balance\n";
  };

  formatTransaction = (transaction: Deposit | Withdrawal): string => {
    const date = this.formatDate(transaction.date);
    const amount = this.formatAmount(transaction.amount);
    const balance = this.formatAmount(transaction.balance);
    if (transaction instanceof Deposit) {
      return date + " || " + amount + " || || " + balance;
    } else {
      return date + " || || " + amount + " || " + balance;
    }
  };

  formatDate = (date: Date): string => {
    return date.toLocaleString("en-GB").split(",")[0];
  };

  formatAmount = (amount: number): string => {
    return amount.toFixed(2);
  };
}
