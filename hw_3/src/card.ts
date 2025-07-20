import { Transaction } from "./transaction.js";
import { CurrencyEnum } from "./enums.js";

export class Card {
  private transactions: Transaction[] = [];

  //   1 Метод Добавления
  addTransaction(transaction: Transaction): string;

  //   2 Метод перегруженный, принимающий Currency и Amount
  addTransaction(currency: CurrencyEnum, amount: number): string;

  //   !!!!!  Реализация метода с перегрузкой  !!!!!
  addTransaction(param1: Transaction | CurrencyEnum, param2?: number): string {
    let transaction: Transaction;

    if (param1 instanceof Transaction) {
      transaction = param1;
    } else {
      transaction = new Transaction(param2!, param1);
    }

    this.transactions.push(transaction);
    return transaction.id;
  }

  getTransaction(id: string): Transaction | undefined {
    return this.transactions.find((tx) => tx.id === id);
  }

  getBalance(currency: CurrencyEnum): number {
    return this.transactions
      .filter((tx) => tx.currency === currency)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }
}
