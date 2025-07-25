"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./models/Card");
const BonusCard_1 = require("./models/BonusCard");
const Pocket_1 = require("./models/Pocket");
// Создаём обычную карту и добавляем транзакции
const regularCard = new Card_1.Card();
regularCard.addTransaction(100, "USD");
regularCard.addTransaction(200, "USD");
// Создаём бонусную карту и добавляем транзакции
const bonusCard = new BonusCard_1.BonusCard();
bonusCard.addTransaction(100, "USD"); // добавит 100 и 10 (бонус)
// Создаём кошелёк и добавляем карты
const pocket = new Pocket_1.Pocket();
pocket.addCard("MainCard", regularCard);
pocket.addCard("Bonus", bonusCard);
// Получаем карту по имени и смотрим её транзакции
const card = pocket.getCard("Bonus");
if (card) {
    console.log("Bonus Card Transactions:", card.getTransactions());
}
// Выводим общую сумму по валюте USD
console.log("Total USD amount:", pocket.getTotalAmount("USD"));
