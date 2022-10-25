import { Transaction } from "./transaction";
export class Deposit extends Transaction {
    constructor(amount, balance) {
        super(amount);
        this.balance = balance + amount;
    }
}
