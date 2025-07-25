"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pocket = void 0;
class Pocket {
    cards = new Map();
    addCard(name, card) {
        this.cards.set(name, card);
    }
    removeCard(name) {
        this.cards.delete(name);
    }
    getCard(name) {
        return this.cards.get(name);
    }
    getTotalAmount(currency) {
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
exports.Pocket = Pocket;
