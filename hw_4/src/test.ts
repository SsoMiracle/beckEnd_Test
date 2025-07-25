import { Card } from "./models/Card";
import { BonusCard } from "./models/BonusCard";
import { Pocket } from "./models/Pocket";

// Создаём обычную карту и добавляем транзакции
const regularCard = new Card();
regularCard.addTransaction(100, "USD");
regularCard.addTransaction(200, "USD");

// Создаём бонусную карту и добавляем транзакции
const bonusCard = new BonusCard();
bonusCard.addTransaction(100, "USD"); // добавит 100 и 10 (бонус)

// Создаём кошелёк и добавляем карты
const pocket = new Pocket();
pocket.addCard("MainCard", regularCard);
pocket.addCard("Bonus", bonusCard);

// Получаем карту по имени и смотрим её транзакции
const card = pocket.getCard("Bonus");
if (card) {
  console.log("Bonus Card Transactions:", card.getTransactions());
}

// Выводим общую сумму по валюте USD
console.log("Total USD amount:", pocket.getTotalAmount("USD"));
