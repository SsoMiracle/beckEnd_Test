import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => User, (user) => user.newsPosts, { onDelete: "CASCADE" })
  author: User;
}
