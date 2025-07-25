import { ICard } from "../interfaces/ICard";

export class Pocket {
  private cards: Map<string, ICard> = new Map();

  addCard(name: string, card: ICard): void {
    this.cards.set(name, card);
  }

  removeCard(name: string): void {
    this.cards.delete(name);
  }

  getCard(name: string): ICard | undefined {
    return this.cards.get(name);
  }

  getTotalAmount(currency: string): number {
    let total = 0;

    for (const card of this.cards.values()) {
      for (const tx of card.getTransactions()) {
        if (tx.currency === currency) {
          total += tx.amount;
        }
      }
    }
    return total;
  }
}
