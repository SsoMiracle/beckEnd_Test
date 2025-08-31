import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { NewsPost } from "./NewsPost";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => NewsPost, (newsPost) => newsPost.author)
  newsPosts: NewsPost[];
}
