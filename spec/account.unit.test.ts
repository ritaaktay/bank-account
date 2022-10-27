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
  it("stores a history of transactions that starts as empty", () => {
    const account = new Account(mockDeposit, mockWithdrawal);
    expect(account.getBalance()).toEqual(0);
  });

  it("can make a deposit", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "deposit",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    expect(mockDeposit).toHaveBeenCalledTimes(1);
    expect(mockDeposit).toHaveBeenCalledWith(50, 0);
    expect(account.getBalance()).toEqual(50);
  });

  it("can make a withdrawal", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "deposit",
      };
    });
    mockWithdrawal.mockImplementation(() => {
      return {
        amount: 40,
        balance: 10,
        date: new Date(),
        type: "withdrawal",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    account.makeWithdrawal(40);
    expect(mockDeposit).toHaveBeenCalledTimes(1);
    expect(mockDeposit).toHaveBeenCalledWith(50, 0);
    expect(mockWithdrawal).toHaveBeenCalledTimes(1);
    expect(mockWithdrawal).toHaveBeenCalledWith(40, 50);
    expect(account.getBalance()).toEqual(10);
  });

  it("will not allow withdrawal exceeding balance", () => {
    mockDeposit.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "deposit",
      };
    });
    const account = new Account(mockDeposit, mockWithdrawal);
    account.makeDeposit(50);
    expect(() => {
      account.makeWithdrawal(100);
    }).toThrowError("Insufficient funds");
    expect(mockDeposit).toHaveBeenCalledTimes(1);
    expect(mockDeposit).toHaveBeenCalledWith(50, 0);
    expect(mockWithdrawal).not.toHaveBeenCalled();
  });

  it("can calculate current balance with many transactions", () => {
    const account = new Account(mockDeposit, mockWithdrawal);
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "deposit",
      };
    });
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 100,
        date: new Date(),
        type: "deposit",
      };
    });
    mockWithdrawal.mockImplementation(() => {
      return {
        amount: 50,
        balance: 50,
        date: new Date(),
        type: "deposit",
      };
    });
    mockDeposit.mockImplementationOnce(() => {
      return {
        amount: 50,
        balance: 100,
        date: new Date(),
        type: "deposit",
      };
    });
    account.makeDeposit(50);
    account.makeDeposit(50);
    account.makeWithdrawal(50);
    account.makeDeposit(50);
    expect(account.getBalance()).toEqual(100);
    expect(mockDeposit).toHaveBeenCalledTimes(3);
    expect(mockWithdrawal).toHaveBeenCalledTimes(1);
    expect(mockDeposit).toHaveBeenNthCalledWith(1, 50, 0);
    expect(mockDeposit).toHaveBeenNthCalledWith(2, 50, 50);
    expect(mockWithdrawal).toHaveBeenCalledWith(50, 100);
    expect(mockDeposit).toHaveBeenNthCalledWith(3, 50, 50);
  });
});
