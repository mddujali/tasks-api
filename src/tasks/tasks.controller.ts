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
  async updateTask(
    @Param('id') id: string,
    @Body() task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { id: string } {
    return { id };
  }
}
