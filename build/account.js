export class Account {
    constructor(deposit, withdrawal) {
        this.getTransactions = () => {
            return this.transactions;
        };
        this.balance = () => {
            if (this.transactions.length === 0)
                return 0;
            else
                return this.transactions[this.transactions.length - 1].balance;
        };
        this.makeDeposit = (amount) => {
            const deposit = this.createDeposit(amount, this.balance());
            this.transactions.push(deposit);
        };
        this.makeWithdrawal = (amount) => {
            console.log(this.balance());
            console.log(amount);
            if (this.balance() < amount)
                throw Error("Insufficient funds");
            const withdrawal = this.createWithdrawal(amount, this.balance());
            this.transactions.push(withdrawal);
        };
        this.transactions = [];
        this.createWithdrawal = withdrawal;
        this.createDeposit = deposit;
    }
}
