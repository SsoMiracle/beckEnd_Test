"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusCard = void 0;
class BonusCard {
    transactions = [];
    addTransaction(amount, currency) {
        this.transactions.push({ amount, currency });
        const bonus = amount * 0.1;
        this.transactions.push({ amount: bonus, currency });
    }
    getTransactions() {
        return this.transactions;
    }
}
exports.BonusCard = BonusCard;
