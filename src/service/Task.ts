import TaskDAO from '../dao/Task';

interface CreateTaskDTO {
  title: string;
  desc: string;
  state: number;
  category: number;
  priority: number;
}

interface UpdateTaskDTO {
  title?: string;
  desc?: string;
  state?: number;
  category?: number;
  priority?: number;
}

export default class TaskService {
  static async getAllTasksForUser(userId: string) {
    return await TaskDAO.fetchAllByUserId(userId);
  }

  static async createTask(userId: string, data: CreateTaskDTO) {
    const task = await TaskDAO.create({
      ...data,
      userId,
      createdAt: Date.now(),
    });
    return task;
  }

  static async updateTask(
    taskId: string,
    userId: string,
    updates: UpdateTaskDTO
  ) {
    const task = await TaskDAO.update(taskId, userId, updates);
    if (!task) throw new Error('Task not found');
    return task;
  }

  static async deleteTask(taskId: string, userId: string) {
    const deleted = await TaskDAO.delete(taskId, userId);
    if (!deleted) throw new Error('Task not found or already deleted');
    return deleted;
  }
}
