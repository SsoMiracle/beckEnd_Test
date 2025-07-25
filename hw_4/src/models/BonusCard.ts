import { ICard } from "../interfaces/ICard";

export class BonusCard implements ICard {
  private transactions: { amount: number; currency: string }[] = [];

  addTransaction(amount: number, currency: string): void {
    this.transactions.push({ amount, currency });
    const bonus = amount * 0.1;
    this.transactions.push({ amount: bonus, currency });
  }

  getTransactions(): { amount: number; currency: string }[] {
    return this.transactions;
  }
}
