import { NewspostsRepository } from "../repositories/NewspostsRepository";
import { NewsPost } from "../../db/fileDB"; 

export class NewspostsService {
  static getAll(params: { page: number; size: number }): NewsPost[] {
    if (params.page < 0 || params.size <= 0) {
      throw new Error("Невалидные параметры пагинации");
    }
    return NewspostsRepository.getAll(params);
  }

  static getById(id: number): NewsPost | null {
    return NewspostsRepository.getById(id);
  }

  static create(data: Omit<NewsPost, "id">): NewsPost {
    if (!data.title || !data.text) {
      throw new Error("Title и text обязательны");
    }
    return NewspostsRepository.create(data);
  }

  static update(id: number, update: Partial<Omit<NewsPost, "id">>): NewsPost | null {
    return NewspostsRepository.update(id, update);
  }

  static delete(id: number): number | null {
    return NewspostsRepository.delete(id);
  }
}
