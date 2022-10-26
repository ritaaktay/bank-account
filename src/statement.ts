import { Account } from "./account";

export class Statement {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  generate = (): string => {
    let statement = this.getHeader();
    statement += this.account
      .getTransactions()
      .map((transaction) => this.formatTransaction(transaction))
      .join("\n");
    return statement;
  };

  getHeader = (): string => {
    return "date || credit || debit || balance\n";
  };

  formatTransaction = (transaction: Transaction): string => {
    const date = this.formatDate(transaction.date);
    const amount = this.formatAmount(transaction.amount);
    const balance = this.formatAmount(transaction.balance);
    if (transaction.type === "Deposit") {
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
