export class Transaction {
  public readonly amount: number;
  public readonly date: Date;

  constructor(amount: number) {
    this.amount = amount;
    this.date = new Date();
  }
}
