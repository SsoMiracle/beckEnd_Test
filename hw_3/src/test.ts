import { Card } from "./card.js";
import { Transaction } from "./transaction.js";
import { CurrencyEnum } from "./enums.js";

const card = new Card();

// Добавляем транзакцию через объект Transaction
const tx1 = new Transaction(100, CurrencyEnum.USD);
const id1 = card.addTransaction(tx1);
console.log("Added transaction with id:", id1);

// Добавляем транзакцию через валюту и сумму
const id2 = card.addTransaction(CurrencyEnum.UAH, 250);
console.log("Added transaction with id:", id2);

// Получаем транзакцию по id
const foundTx = card.getTransaction(id1);
console.log("Found transaction:", foundTx);

// Получаем баланс по валюте
console.log("Balance USD:", card.getBalance(CurrencyEnum.USD));
console.log("Balance UAH:", card.getBalance(CurrencyEnum.UAH));
