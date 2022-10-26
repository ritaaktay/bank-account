export default function (amount, balance) {
  return {
    amount,
    balance: balance - amount,
    date: new Date(),
    type: 'Withdrawal'
  }
}
