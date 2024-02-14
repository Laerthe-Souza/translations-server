import { Project } from '../entities/project.entity';
import { AddUserToProjectDTO } from './dtos/add-user-to-project.dto';
import { InsertProjectDTO } from './dtos/insert-project.dto';
import { UserAlreadyInProjectDTO } from './dtos/user-already-in-project.dto';

export interface ProjectsRepository {
  insert(project: InsertProjectDTO): Promise<Project>;
  findByName(name: string): Promise<Project>;
  findAllByUserId(userId: string): Promise<Project[]>;
  addUser(data: AddUserToProjectDTO): Promise<void>;
  userAlreadyInProject(data: UserAlreadyInProjectDTO): Promise<boolean>;
}
