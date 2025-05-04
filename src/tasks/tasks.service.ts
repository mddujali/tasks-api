import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
const filePath = './data/tasks.json';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  async getTasks(): Promise<Task[]> {
    return await this.readFile();
  }

  async getTask(id: string): Promise<any> {
    const tasks: Task[] = await this.readFile();
    const task: any = tasks.find((task: Task) => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  private async readFile(): Promise<Task[]> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');

      return JSON.parse(data) as Task[];
    } catch {
      return [];
    }
  }
}
