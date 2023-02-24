import { Request, Response } from 'express';
import { TaskController, TaskRequest } from '@/controls/tasks';
import { Task } from '@/entity/task';

interface TasksResponse {
  tasks: Task[];
}

type TasksResponseBuilder = (tasks: Task[]) => TasksResponse;

const tasksResponseBuilder: TasksResponseBuilder = (tasks: Task[]) => ({ tasks });

export const tasksGetHandler = async (req: Request, res: Response) => {
  const requestParams = req.query as TaskRequest;
  const controller = new TaskController();
  const tasks: Task[] = await controller.search(requestParams)
  const response = tasksResponseBuilder(tasks);
  return res.json(response);
};

interface TaskResponse {
  task: Task;
}

type TaskResponseBuilder = (task: Task) => TaskResponse;

const taskResponseBuilder: TaskResponseBuilder = (task: Task) => ({ task });

export const tasksPostHandler = async (req: Request, res: Response) => {
  console.dir({req, params: req.params, body: req.body})
  const taskId = req.params.id ? parseInt(req.params.id) : null;
  const taskUpdate = req.body as Task;
  const controller = new TaskController();
  const task: Task = await controller.createOrUpdate(taskId, taskUpdate)
  const response = taskResponseBuilder(task);
  return res.json(response);
};
