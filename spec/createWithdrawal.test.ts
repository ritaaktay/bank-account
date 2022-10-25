import { describe, expect, it, test } from "@jest/globals";
import createWithdrawal from "../src/createWithdrawal";

describe("createWithdrawal", () => {
  it("stores the withdrawal amount", () => {
    const withdrawal = createWithdrawal(25, 50);
    expect(withdrawal.amount).toEqual(25);
  });

  it("stores the withdrawal date", () => {
    const withdrawal = createWithdrawal(25, 50);
    const date = new Date();
    expect(withdrawal.date.getFullYear()).toEqual(date.getFullYear());
    expect(withdrawal.date.getMonth()).toEqual(date.getMonth());
    expect(withdrawal.date.getDate()).toEqual(date.getDate());
  });

  it("stores the balance after withdrawal", () => {
    const withdrawal = createWithdrawal(25, 50);
    expect(withdrawal.balance).toEqual(25);
  });
});
