import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { Account } from "../src/account";
import createDeposit from "../src/createDeposit";
import createWithdrawal from "../src/createWithdrawal";

jest.mock("../src/createDeposit");
jest.mock("../src/createWithdrawal");

const mockDeposit = createDeposit as jest.MockedFunction<typeof createDeposit>;
const mockWithdrawal = createWithdrawal as jest.MockedFunction<
  typeof createWithdrawal
>;

beforeEach(() => {
  mockDeposit.mockClear();
  mockWithdrawal.mockClear();
});

describe("", () => {
  it("stores history of transactions", () => {
    const account = new Account(mockDeposit, mockWithdrawal);
    expect(account.balance()).toEqual(0);
  });

  it("can make a deposit", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "Deposit",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    expect(account.balance()).toEqual(50);
  });

  it("can make a withdrawal", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "Deposit",
      };
    });
    mockWithdrawal.mockImplementation(() => {
      return {
        amount: 40,
        balance: 10,
        date: new Date(),
        type: "Deposit",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    account.makeWithdrawal(40);
    expect(account.balance()).toEqual(10);
  });

  it("will not allow withdrawal exceeding balance", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "Deposit",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    expect(() => {
      account.makeWithdrawal(100);
    }).toThrowError("Insufficient funds");
  });

  it("can calculate current balance", () => {
    const account = new Account(mockDeposit, mockWithdrawal);
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "Deposit",
      };
    });
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 100,
        date: new Date(),
        type: "Deposit",
      };
    });
    mockWithdrawal.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "Deposit",
      };
    });
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 100,
        date: new Date(),
        type: "Deposit",
      };
    });
    account.makeDeposit(50);
    account.makeDeposit(50);
    account.makeWithdrawal(50);
    account.makeDeposit(50);
    expect(account.balance()).toEqual(100);
  });
});
