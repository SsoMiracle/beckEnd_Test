import { Table, registerSchema } from "../../db/fileDB";
import type { User } from "../models/User"; 


registerSchema("users", {
  id: Number,
  email: String,
  password: String,
  createDate: Date,
});

let usersTable: Table<User> | null = null;
function table(): Table<User> {
  if (!usersTable) usersTable = new Table<User>("users");
  return usersTable;
}

export class UsersRepository {
  static getById(id: number): User | null {
    return table().getById(id);
  }

  static findByEmail(email: string): User | null {
    return (
      table()
        .getAll()
        .find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
    );
  }

  static create(data: Omit<User, "id" | "createDate">): User {
    // Table.create сам выставит id и createDate (если указано в схеме)
    return table().create(data as any);
  }
}
