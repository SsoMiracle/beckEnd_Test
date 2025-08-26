import pool from "../db/db.js";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const page = parseInt(args.page) || 1;
const size = parseInt(args.size) || 10;
const offset = (page - 1) * size;

try {
  const { rows } = await pool.query(
    "SELECT * FROM videos LIMIT $1 OFFSET $2",
    [size, offset]
  );
  console.log(rows);
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
