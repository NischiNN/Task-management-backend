import { Request, Response } from 'express';
import TaskService from '../service/Task';

export default class TaskController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskService.getAllTasksForUser(
        req['userId'].toString()
      );
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  // POST /tasks — create a new task
  static create = async (req: Request, res: Response) => {
    const { title, desc, state, category, priority } = req.body;

    try {
      const task = await TaskService.createTask(req['userId'].toString(), {
        title,
        desc,
        state,
        category,
        priority,
      });

      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  // PUT /tasks/:id — update a task
  static update = async (req: Request, res: Response) => {
    const taskId = String(req.params.id);
    const updates = req.body;
    const userId = req['userId'];

    try {
      const updatedTask = await TaskService.updateTask(taskId, userId, updates);
      res.json(updatedTask);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  // DELETE /tasks/:id — delete a task
  static delete = async (req: Request, res: Response) => {
    const taskId = String(req.params.id)
    const userId = req['userId'];

    try {
      const deleted = await TaskService.deleteTask(taskId, userId);
      res.json({ message: 'Task deleted', task: deleted });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}
