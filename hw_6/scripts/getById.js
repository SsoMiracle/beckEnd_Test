import pool from "../db/index.js";
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;

try {
  const res = await pool.query("SELECT * FROM newsPosts WHERE id = $1;", [argv.id]);
  console.log("📌 Запись:", res.rows[0] || "Нет записи");
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
