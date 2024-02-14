import { randomUUID } from 'crypto';

type ProjectConstructor = {
  id: string;
  name: string;
  createdAt: Date;
};

type CreateProjectCommand = {
  name: string;
};

type RestoreProjectCommand = {
  id: string;
  name: string;
  createdAt: Date;
};

export class Project {
  id: string;
  name: string;
  createdAt: Date;

  private constructor({ id, name, createdAt }: ProjectConstructor) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  static create({ name }: CreateProjectCommand): Project {
    if (name.length < 3) {
      throw new Error('THREE_CHARACTERS_REQUIRED_FOR_NAME');
    }

    const id = randomUUID();
    const createdAt = new Date();

    return new Project({ id, name, createdAt });
  }

  static restore(project: RestoreProjectCommand): Project {
    return new Project(project);
  }
}
