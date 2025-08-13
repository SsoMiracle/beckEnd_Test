import { Table, NewsPost, registerSchema } from "../../db/fileDB";

interface PaginationParams {
  size: number;
  page: number;
}

registerSchema("news", {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
});

const newsTable = new Table<NewsPost>("news");

export class NewspostsRepository {
  static getAll({ page, size }: PaginationParams) {
    const allNews = newsTable.getAll();
    const start = page * size;
    const end = start + size;
    return allNews.slice(start, end);
  }

  static getById(id: number) {
    return newsTable.getById(id);
  }

  static create(data: { title: string; text: string }) {
    return newsTable.create(data);
  }

  static update(id: number, update: Partial<{ title: string; text: string }>) {
    return newsTable.update(id, update);
  }

  static delete(id: number) {
    return newsTable.delete(id);
  }
}
