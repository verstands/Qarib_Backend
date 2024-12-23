import { Module } from '@nestjs/common';
import { FavoriService } from './favori.service';
import { FavoriController } from './favori.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FavoriService, PrismaService],
  controllers: [FavoriController]
})
export class FavoriModule {}
