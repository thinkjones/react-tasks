import 'reflect-metadata';
import { TaskController } from 'src/controls/tasks';
import { Task, TaskPriority } from 'src/entity/task';
import { AppDataSource } from 'src/boundaries/data-source';

/**
 * Helper script to seed database with some seed tasks
 * To run: npx ts-node -r tsconfig-paths/register -r dotenv/config scripts/seed
 */

async function runThisCode(): Promise<void> {
  await AppDataSource.getInstance();
  const controller = new TaskController();
  const task = new Task();
  task.title = 'First Task'
  task.description = 'Seed task'
  task.priority = TaskPriority.HIGH
  task.dueAt = new Date();
  await controller.insert(task)
  console.log("Seed data inserted.")
}


runThisCode()
  .then(() => console.log('Finished!'))
  .catch((error) => console.error(error));
