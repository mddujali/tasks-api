import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
const filePath = './data/tasks.json';
import { Task } from './task.interface';
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

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const tasks: Task[] = await this.readFile();
    const index: number = tasks.findIndex(
      (task: Task): boolean => task.id === id,
    );

    if (index === -1) {
      throw new NotFoundException();
    }

    tasks[index] = {
      ...tasks[index],
      ...task,
      updatedAt: moment().toISOString(),
    };

    await this.writeFile(tasks);

    return tasks[index];
  }

  async deleteTask(id: string): Promise<void> {
    const tasks: Task[] = await this.readFile();
    const filteredTasks: Task[] = tasks.filter(
      (task: Task): boolean => task.id !== id,
    );

    await this.writeFile(filteredTasks);
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
