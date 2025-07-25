import { ICard } from "../interfaces/ICard";

export class Card implements ICard {
  private transactions: { amount: number; currency: string }[] = [];

  addTransaction(amount: number, currency: string): void {
    this.transactions.push({ amount, currency });
  }

  getTransactions(): { amount: number; currency: string }[] {
    return this.transactions;
  }
}
