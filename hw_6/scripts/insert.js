import pool from "../db/index.js";
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;

try {
  const res = await pool.query(
    "INSERT INTO newsPosts (title, text) VALUES ($1, $2) RETURNING *;",
    [argv.title, argv.text]
  );
  console.log("✅ Добавлена запись:", res.rows[0]);
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
