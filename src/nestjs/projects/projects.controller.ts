import { CreateProjectDTO } from '@core/application/dtos/create-project.dto';
import { ProjectsService } from '@core/application/services/projects.service';
import { AddUserToProjectDTO } from '@core/domain/repositories/dtos/add-user-to-project.dto';
import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() data: CreateProjectDTO) {
    return this.projectsService.create(data);
  }

  @Post('all/user/:id')
  async findAllByUserId(@Param('id') id: string) {
    return this.projectsService.findAllByUserId(id);
  }

  @Post('add-user')
  async addUser(@Body() data: AddUserToProjectDTO) {
    return this.projectsService.addUser(data);
  }
}
