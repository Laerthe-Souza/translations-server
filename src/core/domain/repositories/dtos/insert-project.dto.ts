import { Project } from '@core/domain/entities/project.entity';

export type InsertProjectDTO = Project & {
  userId: string;
};
