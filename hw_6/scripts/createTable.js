import pool from "../db/db";

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsPosts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ Таблица newsPosts создана");
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}