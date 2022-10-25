import { describe, expect, it, test } from "@jest/globals";
import { Deposit } from "../src/deposit";

describe("Deposit", () => {
  it("stores the deposit amount", () => {
    const deposit = new Deposit(25, 50);
    expect(deposit.amount).toEqual(25);
  });

  it("stores the deposit date", () => {
    const deposit = new Deposit(25, 50);
    const date = new Date();
    expect(deposit.date.getFullYear()).toEqual(date.getFullYear());
    expect(deposit.date.getMonth()).toEqual(date.getMonth());
    expect(deposit.date.getDate()).toEqual(date.getDate());
  });

  it("stores the balance after deposit", () => {
    const deposit = new Deposit(25, 50);
    expect(deposit.balance).toEqual(75);
  });
});
