export default function (amount, balance) {
    return {
        amount: amount,
        balance: balance + amount,
        date: new Date(),
        type: "Deposit",
    };
}
