// src/routes/news.ts
import { Router, Request, Response, NextFunction } from "express";
import { NewspostsService } from "../services/NewspostsService";
import Ajv, { ErrorObject } from "ajv";
import { ValidationError, NewspostsServiceError } from "../utils/errors";

const router = Router();
const ajv = new Ajv();

// Схема валидации
const newspostSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 50 },
    text: { type: "string", maxLength: 256 },
    genre: { type: "string", enum: ["Politic", "Business", "Sport", "Other"] },
    isPrivate: { type: "boolean" },
  },
  required: ["title", "text", "genre", "isPrivate"],
  additionalProperties: false,
};

const validateNewspost = ajv.compile(newspostSchema);

// Вспомогательная функция для валидации
function validateBody(body: unknown) {
  const valid = validateNewspost(body);
  if (!valid) {
    const errors = validateNewspost.errors ?? [];

    const formattedErrors = errors.map((e: ErrorObject) => ({
      field: e.instancePath?.replace(/^\//, "") ?? "",
      message: e.message ?? "Invalid value",
    }));

    throw new ValidationError("Invalid newspost data", formattedErrors);
  }
}

// GET /api/newsposts?page=&size=
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 0);
    const size = Number(req.query.size ?? 10);
    const data = await NewspostsService.getAll({ page, size });
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/newsposts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await NewspostsService.getById(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

// POST /api/newsposts
router.post("/", async (req, res, next) => {
  try {
    validateBody(req.body);
    const created = await NewspostsService.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// PUT /api/newsposts/:id
router.put("/:id", async (req, res, next) => {
  try {
    validateBody(req.body);
    const id = Number(req.params.id);
    const updated = await NewspostsService.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/newsposts/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedId = await NewspostsService.delete(id);
    if (!deletedId) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ deletedId });
  } catch (e) {
    next(e);
  }
});

// GET /api/newsposts/error
router.get("/error/test", () => {
  throw new NewspostsServiceError("Test service error");
});

export default router;
