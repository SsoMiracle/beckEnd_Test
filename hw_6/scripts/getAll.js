import pool from "../db/db";


try {
  const res = await pool.query("SELECT * FROM newsPosts ORDER BY id;");
  console.log("📋 Все записи:", res.rows);
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}