// src/dao/TaskDAO.ts
import { v4 } from 'uuid';
import TaskModel from '../models/Task';

interface ITaskCreateDTO {
  userId: string;
  title: string;
  desc: string;
  state: number;
  category: number;
  priority: number;
  createdAt: number;
}

interface ITaskUpdateDTO {
  title?: string;
  desc?: string;
  state?: number;
  category?: number;
  priority?: number;
}

export default class TaskDAO {
  // Create a new task
  static async create(data: ITaskCreateDTO) {
    const id = v4();
    const task = new TaskModel({ ...data, id });
    return await task.save();
  }

  // Fetch all tasks by a specific userId
  static async fetchAllByUserId(userId: string) {
    return await TaskModel.find({ userId }).exec();
  }

  // Update a task by its auto-incremented numeric ID
  static async update(taskId: string, userId: string, updates: ITaskUpdateDTO) {
    return await TaskModel.findOneAndUpdate({ id: taskId, userId }, updates, {
      new: true,
    }).exec();
  }

  // Delete a task by its auto-incremented numeric ID
  static async delete(taskId: string, userId: string) {
    return await TaskModel.findOneAndDelete({ id: taskId, userId }).exec();
  }
}
