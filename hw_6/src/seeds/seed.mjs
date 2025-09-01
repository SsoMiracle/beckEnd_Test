import { AppDataSource } from "../../db/data-source.ts";
import { User } from "../../db/entities/User.ts";
import { NewsPost } from "../../db/entities/NewsPost.ts";
import { faker } from "@faker-js/faker";

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const newsRepo = AppDataSource.getRepository(NewsPost);

  // Создаём стандартного пользователя
  const user = userRepo.create({
    email: "testuser@example.com",
    password: "123456",
  });
  await userRepo.save(user);

  // Создаём 20 новостей
  const newsPosts = [];
  for (let i = 0; i < 20; i++) {
    const post = newsRepo.create({
      header: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(2),
      author: user,
    });
    newsPosts.push(post);
  }
  await newsRepo.save(newsPosts);

  console.log("✅ Seed completed");
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
