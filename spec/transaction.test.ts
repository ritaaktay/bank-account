import { describe, expect, it, test } from "@jest/globals";
import { Transaction } from "../src/transaction";

describe("Transaction", () => {
  it("stores the transaction amount", () => {
    const transaction = new Transaction(25);
    expect(transaction.amount).toEqual(25);
  });

  it("stores the transaction date", () => {
    const transaction = new Transaction(25);
    const date = new Date();
    expect(transaction.date.getFullYear()).toEqual(date.getFullYear());
    expect(transaction.date.getMonth()).toEqual(date.getMonth());
    expect(transaction.date.getDate()).toEqual(date.getDate());
  });
});
