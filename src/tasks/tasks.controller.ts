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
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return [
      {
        id: uuid(),
        taskName: 'Task Name',
        description: 'Task Description',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
      },
    ];
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return {
      id,
      taskName: 'Task Name',
      description: 'Task Description',
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    };
  }

  @Post()
  createTask(@Body() task: Omit<Task, 'id'>): Task {
    const { taskName, description } = task;

    return {
      id: uuid(),
      taskName,
      description,
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    };
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
