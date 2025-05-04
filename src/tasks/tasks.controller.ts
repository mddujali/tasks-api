import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as moment from 'moment';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.tasksService.getTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<any> {
    return await this.tasksService.getTask(id);
  }

  @Post()
  async createTask(@Body() task: Omit<Task, 'id'>): Promise<Task> {
    return await this.tasksService.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: Omit<Task, 'id'>): Task {
    const { taskName, description } = task;

    return {
      id,
      taskName,
      description,
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    };
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { id: string } {
    return { id };
  }
}
