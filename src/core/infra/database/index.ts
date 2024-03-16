import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

export async function postgresSQLHealthCheck(): Promise<void> {
  await prismaClient.userDatabase.count({
    take: 1,
  });
}
