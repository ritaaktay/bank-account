export class Statement {
    constructor(account) {
        this.generate = () => {
            let statement = this.getHeader();
            statement += this.account
                .getTransactions()
                .map((transaction) => this.formatTransaction(transaction))
                .join("\n");
            return statement;
        };
        this.getHeader = () => {
            return "date || credit || debit || balance\n";
        };
        this.formatTransaction = (transaction) => {
            const date = this.formatDate(transaction.date);
            const amount = this.formatAmount(transaction.amount);
            const balance = this.formatAmount(transaction.balance);
            if (transaction.type === "Deposit") {
                return date + " || " + amount + " || || " + balance;
            }
            else {
                return date + " || || " + amount + " || " + balance;
            }
        };
        this.formatDate = (date) => {
            return date.toLocaleString("en-GB").split(",")[0];
        };
        this.formatAmount = (amount) => {
            return amount.toFixed(2);
        };
        this.account = account;
    }
}
