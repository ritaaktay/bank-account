import { describe, expect, it, test } from "@jest/globals";
import { Withdrawal } from "../src/withdrawal";
import { Deposit } from "../src/deposit";
import { Account } from "../src/account";
import { Statement } from "../src/statement";

describe("Statement", () => {
  it("has a header", () => {
    const account = new Account(Deposit, Withdrawal);
    const statement = new Statement(account);
    expect(statement.generate()).toEqual(
      "date || credit || debit || balance\n"
    );
  });

  it("formats a transaction", () => {
    const account = new Account(Deposit, Withdrawal);
    account.makeDeposit(50);
    const statement = new Statement(account);
    const date = new Date().toLocaleString("en-GB").split(",")[0];
    expect(statement.generate()).toEqual(
      "date || credit || debit || balance\n" + date + " || 50.00 || || 50.00"
    );
  });

  it("formats many transactions", () => {
    const account = new Account(Deposit, Withdrawal);
    account.makeDeposit(50);
    account.makeDeposit(25);
    account.makeWithdrawal(10);
    const statement = new Statement(account);
    const date = new Date().toLocaleString("en-GB").split(",")[0];
    expect(statement.generate()).toEqual(
      "date || credit || debit || balance\n" +
        date +
        " || 50.00 || || 50.00" +
        "\n" +
        date +
        " || 25.00 || || 75.00" +
        "\n" +
        date +
        " || || 10.00 || 65.00"
    );
  });
});
