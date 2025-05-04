import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
const filePath = './data/tasks.json';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

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

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const tasks = await this.readFile();
    const newTask = {
      id: uuid(),
      ...task,
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    };

    tasks.push(newTask);

    await this.writeFile(tasks);

    return newTask;
  }

  private async readFile(): Promise<Task[]> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');

      return JSON.parse(data) as Task[];
    } catch {
      return [];
    }
  }

  private async writeFile(tasks: Task[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  }
}
