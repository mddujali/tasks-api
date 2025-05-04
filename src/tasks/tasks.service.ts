import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
const filePath = './data/tasks.json';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  async getTasks(): Promise<Task[]> {
    return await this.readFile();
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
