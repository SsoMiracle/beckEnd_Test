// index.js
import { registerSchema, getTable } from "./fileDB.js";

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

// Register the schema for the 'newspost' table
registerSchema("newspost", newspostSchema);

// Get the table object
const newspostTable = getTable("newspost");

// Create a new post
const created = newspostTable.create({
  title: "A fox cub was born in the zoo",
  text: "At the city zoo, a red fox named Ruby gave birth to a healthy little cub. Visitors are welcome to come and see the adorable baby fox!",
});
console.log("✅ Created:", created);

// Get all posts
console.log("📋 All posts:", newspostTable.getAll());

// Update the post
const updated = newspostTable.update(created.id, {
  title: "Little fox draws attention in the zoo",
});
console.log("✏️ Updated:", updated);

// Delete the post
const deletedId = newspostTable.delete(created.id);
console.log("🗑️ Deleted ID:", deletedId);
