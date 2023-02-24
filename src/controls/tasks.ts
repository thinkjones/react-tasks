import { Task, TaskPriority, TaskSort } from '@/entity/task';
import { AppDataSource } from '@/boundaries/data-source';
import { Repository } from 'typeorm/repository/Repository';

export interface TaskRequest {
  sort?: TaskSort;
  status?: string;
  dueAt?: Date;
  priority?: TaskPriority;
  searchTerm?: string;
}

// task.controller.ts
export class TaskController {
  taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.instance.getRepository(Task)
  }

  task(id: number) {
    return this.taskRepository.findOneBy({id})
  }

  tasks() {
    return this.taskRepository.find()
  }

  async totalTasks() {
    return await this.taskRepository.count()
  }

  async insert(item: Task) {
    return await this.taskRepository.save(item)
  }

  async search(request: TaskRequest): Promise<Array<Task>> {
    let query = await this.taskRepository.createQueryBuilder()
      .select('task')
      .from(Task, "task")
    if (request.priority) {
      query.andWhere("task.priority = :priority", { priority: request.priority });
    }
    if (request.status) {
      if (request.status === 'completed') {
        query.andWhere("task.completed_at is not null");
      } else if (request.status == 'todo') {
        query.andWhere("task.completed_at is null");
      }
    }
    if (request.dueAt) {
      query.andWhere("DATE(task.due_at) = :due_at", { due_at: request.dueAt });
    }
    if (request.searchTerm) {
      query.andWhere("UPPER(task.title) like :searchTerm or UPPER(task.description) like :searchTerm", { searchTerm: `%${request.searchTerm.toUpperCase()}%` });
    }

    const sortField = request.sort || TaskSort.dueAt;
    const sortDirection = request.sort === TaskSort.dueAt ? 'DESC' : 'ASC';
    query.addOrderBy(`task.${sortField}`, sortDirection)

    return query.getMany()
  }

  async createOrUpdate(taskId: number | null, taskUpdate: Task): Promise<Task> {
    let task = new Task();
    if (taskId) {
      if (taskUpdate.title) {
        task.title = taskUpdate.title;
      }
      if (taskUpdate.description) {
        task.description = taskUpdate.description;
      }
      if (taskUpdate.priority) {
        task.priority = taskUpdate.priority;
      }
      if (taskUpdate.dueAt) {
        task.dueAt = taskUpdate.dueAt;
      }
      task.completedAt = taskUpdate.completedAt;
    } else {
      task = taskUpdate as Task;
    }
    return this.insert(task);
  }
}
