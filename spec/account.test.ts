import { describe, expect, it, test } from "@jest/globals";
import { Account } from "../src/account";
import { Deposit } from "../src/deposit";
import { Withdrawal } from "../src/withdrawal";

describe("Account", () => {
  it("stores history of transactions", () => {
    const account = new Account(Deposit, Withdrawal);
    expect(account.balance()).toEqual(0);
  });

  it("can make a deposit", () => {
    const account = new Account(Deposit, Withdrawal);
    account.deposit(50);
    expect(account.balance()).toEqual(0);
  });
});
