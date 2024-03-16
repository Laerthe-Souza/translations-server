import { postgresSQLHealthCheck } from './database';

export async function checkServices(): Promise<void> {
  await postgresSQLHealthCheck();
}
