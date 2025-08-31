import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../db/data-source";
import { NewsPost } from "../../db/entities/NewsPost";
import { User } from "../../db/entities/User";
import Ajv, { ErrorObject } from "ajv";
import { ValidationError } from "../utils/errors";
import passport from "passport";

const router = Router();
const ajv = new Ajv();

// --- Схема валидации
const newspostSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 50 },
    text: { type: "string", maxLength: 256 },
  },
  required: ["title", "text"],
  additionalProperties: false,
};

const validateNewspost = ajv.compile(newspostSchema);

// --- Валидация тела запроса
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

const newsRepo = AppDataSource.getRepository(NewsPost);

// --- GET /api/newsposts?page=&size= (публичный)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 0);
    const size = Number(req.query.size ?? 10);

    if (page < 0 || size <= 0) throw new ValidationError("Invalid pagination");

    const [data, total] = await newsRepo.findAndCount({
      relations: ["author"],
      skip: page * size,
      take: size,
      order: { id: "DESC" },
    });

    res.json({ data, total, page, size });
  } catch (e) {
    next(e);
  }
});

// --- GET /api/newsposts/:id (публичный)
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await newsRepo.findOne({
      where: { id },
      relations: ["author"],
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

// --- POST /api/newsposts (только залогиненный пользователь)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      validateBody(req.body);

      const user = req.user as User;
      const post = newsRepo.create({
        ...req.body,
        author: user,
      });

      const created = await newsRepo.save(post);
      res.status(201).json(created);
    } catch (e) {
      next(e);
    }
  }
);

// --- PUT /api/newsposts/:id (только автор может редактировать)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      validateBody(req.body);

      const id = Number(req.params.id);
      let post = await newsRepo.findOne({
        where: { id },
        relations: ["author"],
      });
      if (!post) return res.status(404).json({ error: "Not found" });

      const user = req.user as User;
      if (post.author.id !== user.id)
        return res.status(403).json({ error: "Forbidden" });

      newsRepo.merge(post, req.body);
      const updated = await newsRepo.save(post);

      res.json(updated);
    } catch (e) {
      next(e);
    }
  }
);

// --- DELETE /api/newsposts/:id (только автор может удалить)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      const id = Number(req.params.id);

      const post = await newsRepo.findOne({
        where: { id },
        relations: ["author"],
      });
      if (!post) return res.status(404).json({ error: "Not found" });

      const user = req.user as User;
      if (post.author.id !== user.id)
        return res.status(403).json({ error: "Forbidden" });

      await newsRepo.delete(id);
      res.status(200).json({ deletedId: id });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
