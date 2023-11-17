import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
// import { MongooseModule } from './mongoose/mongoose.module';

@Module({ providers: [PrismaService], exports: [PrismaService] })
export class DatabaseModule {
  static forDatabase(database: string) {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'USER',
          useValue: database,
        },
        PrismaService,
      ],
      exports: [PrismaService],
    };
  }
}
