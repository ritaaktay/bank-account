import { Transaction } from "./transaction";

export class Deposit extends Transaction {
  public readonly balance: number;

  constructor(amount: number, balance: number) {
    super(amount);
    this.balance = balance + amount;
  }
}
