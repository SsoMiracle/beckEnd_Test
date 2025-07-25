"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    transactions = [];
    addTransaction(amount, currency) {
        this.transactions.push({ amount, currency });
    }
    getTransactions() {
        return this.transactions;
    }
}
exports.Card = Card;
