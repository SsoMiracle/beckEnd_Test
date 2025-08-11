import { Router, Request, Response } from "express";
import { Table, NewsPost, registerSchema } from "../../db/fileDB";

const router = Router();

registerSchema("news", {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
});

const newsTable = new Table<NewsPost>("news");

// get all news

router.get("/", (_req: Request, res: Response) => {
  try {
    const news = newsTable.getAll();
    res.json(news);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get news by id

router.get("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const news = newsTable.getById(id);
    if (!news) return res.status(404).json({ error: "Not found" });
    res.json(news);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create news

router.post("/", (req: Request, res: Response) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: "Missing title or text" });
    }
    console.log("BODY:", req.body);
    const newPost = newsTable.create({ title, text });
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reload news

router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = newsTable.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete news

router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedId = newsTable.delete(id);
    if (!deletedId) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ deletedId });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
