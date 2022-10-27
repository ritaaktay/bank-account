import { describe, expect, it, test } from "@jest/globals";
import { Account } from "../src/account";
import { createDeposit } from "../src/createDeposit";
import { createWithdrawal } from "../src/createWithdrawal";

describe("Account", () => {
  it("stores history of transactions that starts empty", () => {
    const account = new Account(createDeposit, createWithdrawal);
    expect(account.getBalance()).toEqual(0);
  });

  it("can make a deposit", () => {
    const account = new Account(createDeposit, createWithdrawal);
    account.makeDeposit(50);
    expect(account.getBalance()).toEqual(50);
  });

  it("can make a withdrawal", () => {
    const account = new Account(createDeposit, createWithdrawal);
    account.makeDeposit(50);
    account.makeWithdrawal(50);
    expect(account.getBalance()).toEqual(0);
  });

  it("will not allow withdrawal exceeding balance", () => {
    const account = new Account(createDeposit, createWithdrawal);
    account.makeDeposit(50);
    expect(() => {
      account.makeWithdrawal(100);
    }).toThrowError("Insufficient funds");
  });

  it("can calculate current balance after many transactions", () => {
    const account = new Account(createDeposit, createWithdrawal);
    account.makeDeposit(50);
    account.makeDeposit(50);
    account.makeWithdrawal(50);
    account.makeDeposit(50);
    expect(account.getBalance()).toEqual(100);
  });
});
