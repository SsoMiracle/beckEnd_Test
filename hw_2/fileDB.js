import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "db");
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH);
}

const schemas = {};
const dataCache = {};

export function registerSchema(tableName, schema) {
  schemas[tableName] = schema;

  const filePath = path.join(DB_PATH, `${tableName}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

function loadData(tableName) {
  const filePath = path.join(DB_PATH, `${tableName}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  
  return JSON.parse(raw, (key, value) => {
    if (schemas[tableName][key] === Date) return new Date(value);
    return value;
  });
}

function saveData(tableName, data) {
  const filePath = path.join(DB_PATH, `${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getTable(tableName) {
  if (!schemas[tableName]) {
    throw new Error(`Schema not registered for table: ${tableName}`);
  }

  if (!dataCache[tableName]) {
    dataCache[tableName] = loadData(tableName);
  }

  const schema = schemas[tableName];
  const data = dataCache[tableName];

  return {
    getAll() {
      return [...data];
    },

    getById(id) {
      return data.find((item) => item.id === id) || null;
    },

    create(record) {
      const newId = data.length ? Math.max(...data.map((r) => r.id)) + 1 : 1;
      const newRecord = { ...record, id: newId };

      if (schema.createDate === Date) {
        newRecord.createDate = new Date();
      }

      data.push(newRecord);
      saveData(tableName, data);
      return newRecord;
    },

    update(id, updates) {
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return null;

      data[index] = { ...data[index], ...updates };
      saveData(tableName, data);
      return data[index];
    },

    delete(id) {
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return null;

      const [removed] = data.splice(index, 1);
      saveData(tableName, data);
      return removed.id;
    },
  };
}
