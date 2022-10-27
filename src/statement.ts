import { Account } from "./account";

export class Statement {
  private account: Account;
  private header: string;

  constructor(account: Account) {
    this.account = account;
    this.header = "date || credit || debit || balance\n";
  }

  generate = (): string => {
    let statement = this.#getHeader();
    statement += this.account
      .getTransactions().reverse()
      .map(this.#formatTransaction)
      .join("\n");
    return statement;
  };

  #getHeader = (): string => {
    return this.header;
  };

  #formatTransaction = (transaction: Transaction): string => {
    const date = this.#formatDate(transaction.date);
    const amount = this.#formatAmount(transaction.amount);
    const balance = this.#formatAmount(transaction.balance);
    if (transaction.type === "deposit") {
      return date + " || " + amount + " || || " + balance;
    }
    return date + " || || " + amount + " || " + balance;
  };

  #formatDate = (date: Date): string => {
    return date.toLocaleString("en-GB").split(",")[0];
  };

  #formatAmount = (amount: number): string => {
    return amount.toFixed(2);
  };
}
