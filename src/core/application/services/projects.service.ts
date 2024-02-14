import { Project } from '@core/domain/entities/project.entity';
import { ProjectsRepository } from '@core/domain/repositories/projects-repository';
import { CreateProjectDTO } from '../dtos/create-project.dto';
import { AddUserToProjectDTO } from '@core/domain/repositories/dtos/add-user-to-project.dto';
import { HttpError } from '../errors/HttpError';

export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async create({ name, userId }: CreateProjectDTO): Promise<Project> {
    const projectNameAlreadyExists =
      await this.projectsRepository.findByName(name);

    if (projectNameAlreadyExists) {
      throw new Error('PROJECT_NAME_ALREADY_EXISTS');
    }

    const project = Project.create({ name });

    return this.projectsRepository.insert({ userId, ...project });
  }

  async findAllByUserId(userId: string): Promise<Project[]> {
    return this.projectsRepository.findAllByUserId(userId);
  }

  async addUser(data: AddUserToProjectDTO): Promise<void> {
    const userAlreadyInProject =
      await this.projectsRepository.userAlreadyInProject(data);

    if (userAlreadyInProject) {
      throw new HttpError('USER_ALREADY_IN_PROJECT');
    }

    await this.projectsRepository.addUser(data);
  }
}
