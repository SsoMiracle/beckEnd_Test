import pool from "../db/db.js";

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title TEXT,
      views FLOAT4,
      category TEXT
    );
  `);
  console.log("✅ Таблица videos создана");
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
