import pool from "../db/index.js";
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;

try {
  const res = await pool.query(
    "UPDATE newsPosts SET title = $1, text = $2 WHERE id = $3 RETURNING *;",
    [argv.title, argv.text, argv.id]
  );
  console.log("✏️ Обновлено:", res.rows[0] || "Нет такой записи");
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
