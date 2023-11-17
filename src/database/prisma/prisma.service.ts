import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private prisma: PrismaClient = new PrismaClient();

  // constructor(private readonly database: string) {
  //   super();
  //   this.prisma = new PrismaClient();

  //   switch (database) {
  //     case 'USER':
  //       this.prisma.user;
  //     default:
  //       this.prisma.token;
  //   }
  // }

  async onOnModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  //deprecated in Prisma 5.0. In NestJS use  app.enableShutdownHooks() in main.ts
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => await app.close);
  // }

  // Custom method to get only the user model
  getUserModel() {
    return this.prisma.user;
  }

  // Custom method to get only the other model
  // getUserRoleModel() {
  //   return this.prisma.userRole;
  // }
}
