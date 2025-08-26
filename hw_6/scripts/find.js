import pool from "../db/db.js";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const search = args.search || "";

try {
  const { rows } = await pool.query(
    "SELECT * FROM videos WHERE title ILIKE $1",
    [`%${search}%`]
  );
  console.log(rows);
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
