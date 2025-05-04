import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Res() res: Response): Promise<Response> {
    return res.json(await this.tasksService.getTasks());
  }

  @Get(':id')
  async getTask(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.tasksService.getTask(id));
  }

  @Post()
  async createTask(
    @Body() task: Omit<Task, 'id'>,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.tasksService.createTask(task));
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: Omit<Task, 'id'>,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.tasksService.updateTask(id, task));
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.tasksService.deleteTask(id));
  }
}
