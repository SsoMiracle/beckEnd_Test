import { v4 as uuidv4 } from "uuid";
import { CurrencyEnum } from "./enums.js";

export class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly currency: CurrencyEnum;

  constructor(amount: number, currency: CurrencyEnum) {
    this.id = uuidv4();
    this.amount = amount;
    this.currency = currency;
  }
}
