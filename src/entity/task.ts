import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskSort {
  status = "status",
  dueAt = "due_at",
  priority = "priority"
}

export enum TaskPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string;

  @Column({nullable: true})
  description?: string;

  @Column({
    type: "enum",
    enum: TaskPriority,
    default: TaskPriority.LOW
  })
  priority!: TaskPriority;

  @Column({ name: "due_at", nullable: true })
  dueAt?: Date;

  @Column({ name: "created_at", default: new Date()})
  createdAt!: Date;

  @Column({ name: "completed_at", nullable: true })
  completedAt?: Date;
}
