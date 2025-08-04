import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "db");
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH);
}

export interface NewsPost {
  id: number;
  title: string;
  text: string;
  createDate?: Date;
}

type Schema = {
  [key: string]: any;
};

const schemas: Record<string, Schema> = {};

export function registerSchema(tableName: string, schema: Schema): void {
  schemas[tableName] = schema;

  const filePath = path.join(DB_PATH, `${tableName}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

function loadData<T>(tableName: string): T[] {
  const filePath = path.join(DB_PATH, `${tableName}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw, (key, value) => {
    if (schemas[tableName] && schemas[tableName][key] === Date)
      return new Date(value);
    return value;
  });
}

function saveData<T>(tableName: string, data: T[]): void {
  const filePath = path.join(DB_PATH, `${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export class Table<T extends { id: number }> {
  private schema: Schema;
  private data: T[];
  private tableName: string;

  constructor(tableName: string) {
    if (!schemas[tableName]) {
      throw new Error(`Schema not registered for table: ${tableName}`);
    }
    this.tableName = tableName;
    this.schema = schemas[tableName];
    this.data = loadData<T>(tableName);
  }

  getAll(): T[] {
    return [...this.data];
  }

  getById(id: number): T | null {
    return this.data.find((item) => item.id === id) || null;
  }

  create(record: Omit<T, "id">): T {
    const newId = this.data.length
      ? Math.max(...this.data.map((r) => r.id)) + 1
      : 1;
    const newRecord = { ...record, id: newId } as T;

    // Добавляем дату создания, если в схеме есть createDate с типом Date
    if (this.schema.createDate === Date) {
      (newRecord as any).createDate = new Date();
    }

    this.data.push(newRecord);
    saveData(this.tableName, this.data);
    return newRecord;
  }

  update(id: number, updates: Partial<Omit<T, "id">>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.data[index] = { ...this.data[index], ...updates };
    saveData(this.tableName, this.data);
    return this.data[index];
  }

  delete(id: number): number | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const [removed] = this.data.splice(index, 1);
    saveData(this.tableName, this.data);
    return removed.id;
  }
}
