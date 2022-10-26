import { describe, expect, it, jest, beforeEach, test } from "@jest/globals";
import { Statement } from "../src/statement";
import { Account } from "../src/account";
import createDeposit from "../src/createDeposit";
import createWithdrawal from "../src/createWithdrawal";

jest.mock("../src/createDeposit");
jest.mock("../src/createWithdrawal");

const mockDeposit = createDeposit as jest.MockedFunction<typeof createDeposit>;
const mockWithdrawal = createWithdrawal as jest.MockedFunction<
  typeof createWithdrawal
>;

const mockGetTransactions = jest.fn();
mockGetTransactions.mockImplementationOnce(() => {
  return [];
});
mockGetTransactions.mockImplementationOnce(() => {
  return [
    {
      amount: 50,
      balance: 50,
      date: new Date(),
      type: "Deposit",
    },
  ];
});
mockGetTransactions.mockImplementationOnce(() => {
  return [
    {
      amount: 50,
      balance: 50,
      date: new Date(),
      type: "Deposit",
    },
    {
      amount: 25,
      balance: 75,
      date: new Date(),
      type: "Deposit",
    },
    {
      amount: 10,
      balance: 65,
      date: new Date(),
      type: "Withdrawal",
    },
  ];
});

jest.mock("../src/account", () => {
  return {
    Account: jest.fn().mockImplementation(() => {
      return {
        getTransactions: mockGetTransactions,
      };
    }),
  };
});

describe("Statement", () => {
  it("has a header", () => {
    const mockAccount = new Account(mockDeposit, mockWithdrawal);
    const statement = new Statement(mockAccount);
    expect(statement.generate()).toEqual(
      "date || credit || debit || balance\n"
    );
  });

  it("formats a transaction", () => {
    const mockAccount = new Account(createDeposit, createWithdrawal);
    const statement = new Statement(mockAccount);
    const date = new Date().toLocaleString("en-GB").split(",")[0];
    expect(statement.generate()).toEqual(
      "date || credit || debit || balance\n" + date + " || 50.00 || || 50.00"
    );
  });

  it("formats many transactions", () => {
    const mockAccount = new Account(createDeposit, createWithdrawal);
    const statement = new Statement(mockAccount);
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
