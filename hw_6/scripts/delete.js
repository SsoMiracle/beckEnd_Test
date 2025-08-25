import pool from "../db/index.js";
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;

try {
  const res = await pool.query(
    "DELETE FROM newsPosts WHERE id = $1 RETURNING *;",
    [argv.id]
  );
  console.log("🗑️ Удалено:", res.rows[0] || "Нет такой записи");
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
