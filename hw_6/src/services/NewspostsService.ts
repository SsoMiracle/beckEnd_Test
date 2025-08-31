import { AppDataSource } from "../../db/data-source";
import { NewsPost } from "../../db/entities/NewsPost"
import { User } from "../../db/entities/User";

const newsRepo = AppDataSource.getRepository(NewsPost);

export class NewspostsService {
  static async getAll(params: { page: number; size: number }) {
    return newsRepo.find({
      relations: ["author"], 
      skip: params.page * params.size,
      take: params.size,
      order: { created_date: "DESC" }
    });
  }

  static async create(data: { title: string; text: string; author: User }) {
    const news = newsRepo.create(data);
    return newsRepo.save(news);
  }
}
