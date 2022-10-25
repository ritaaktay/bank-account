import { Transaction } from "./transaction";
export class Withdrawal extends Transaction {
  constructor(amount, balance) {
    super(amount);
    this.balance = balance - amount;
  }
}
