import pool from "../db/db.js";

try {
  const { rows } = await pool.query(`
    SELECT category, SUM(views) AS total_views
    FROM videos
    GROUP BY category
  `);

  rows.forEach((r) => {
    console.log(`${r.category} - ${r.total_views}`);
  });
} catch (err) {
  console.error("❌ Ошибка:", err);
} finally {
  await pool.end();
}
