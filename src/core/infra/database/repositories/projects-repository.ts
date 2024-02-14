import { Project } from '@core/domain/entities/project.entity';
import { AddUserToProjectDTO } from '@core/domain/repositories/dtos/add-user-to-project.dto';
import { InsertProjectDTO } from '@core/domain/repositories/dtos/insert-project.dto';
import { UserAlreadyInProjectDTO } from '@core/domain/repositories/dtos/user-already-in-project.dto';
import { ProjectsRepository } from '@core/domain/repositories/projects-repository';
import { Prisma } from '@prisma/client';

export class ProjectsRepositoryInfra implements ProjectsRepository {
  constructor(private readonly repository: Prisma.ProjectDatabaseDelegate) {}

  async insert({ userId, ...project }: InsertProjectDTO): Promise<Project> {
    const result = await this.repository.create({
      data: {
        ...project,
        users: {
          create: {
            userId,
          },
        },
      },
    });

    return Project.restore(result);
  }

  async userAlreadyInProject({
    projectId,
    userId,
  }: UserAlreadyInProjectDTO): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id: projectId,
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return count > 0;
  }

  async findAllByUserId(userId: string): Promise<Project[]> {
    const projects = await this.repository.findMany({
      where: { users: { some: { userId } } },
    });

    return projects.map(project => Project.restore(project));
  }

  async findByName(name: string): Promise<Project | null> {
    const project = await this.repository.findUnique({
      where: {
        name,
      },
    });

    if (!project) {
      return null;
    }

    return Project.restore(project);
  }

  async addUser({ projectId, userId }: AddUserToProjectDTO): Promise<void> {
    await this.repository.update({
      where: {
        id: projectId,
      },
      data: {
        users: {
          create: {
            userId,
          },
        },
      },
    });
  }
}
