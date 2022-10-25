## Bank Account

- A TypeScript app for a simple bank account

#### How to use

- Clone this repo and run `npm install` to install dependencies
- Run `npm test` for Jest tests and `npx jest --coverage` to see test coverage

#### Approach

- `Deposit` & `Withdrawal` classes derive from a `Transaction` parent class and store date, amount and balance after transaction
- `Account` class has `makeDeposit()` and `makeWithdrawal()` methods that add instances of `Deposit` or `Withdrawal` to a transactions array
- The account balance is the balance of the last transaction in the array
- The `Statement` class iterates over the transactions of an `Account` instance and formats the information as a string
