export const createWithdrawal = (amount: number, balance: number): Transaction => {
  return {
    amount: amount,
    balance: balance - amount,
    date: new Date(),
    type: "withdrawal",
  };
}
