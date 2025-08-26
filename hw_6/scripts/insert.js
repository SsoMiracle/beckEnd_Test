import pool from "../db/db.js";

const title = process.argv[2] || "Default title";
const views = parseFloat(process.argv[3]) || 0;
const category = process.argv[4] || "Other";

try {
  await pool.query(
    "INSERT INTO videos (title, views, category) VALUES ($1, $2, $3)",
    [title, views, category]
  );
  console.log(`✅ Добавлена запись: ${title} (${views}, ${category})`);
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
