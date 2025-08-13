// src/routes/news.ts
import { Router, Request, Response } from "express";
import { NewspostsService } from "../services/NewspostsService";

const router = Router();

// GET /api/newsposts?page=&size=
router.get("/", (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 0);
    const size = Number(req.query.size ?? 10);
    const data = NewspostsService.getAll({ page, size });
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// GET /api/newsposts/:id
router.get("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const item = NewspostsService.getById(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// POST /api/newsposts
router.post("/", (req: Request, res: Response) => {
  try {
    const created = NewspostsService.create({
      title: req.body.title,
      text: req.body.text,
    });
    res.status(201).json(created);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/newsposts/:id
router.put("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = NewspostsService.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/newsposts/:id
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedId = NewspostsService.delete(id);
    if (!deletedId) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ deletedId });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
