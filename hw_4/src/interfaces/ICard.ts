export interface ICard {
  addTransaction(amount: number, currency: string): void;
  getTransactions(): { amount: number; currency: string }[];
}
