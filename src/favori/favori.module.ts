import { Module } from '@nestjs/common';
import { FavoriService } from './favori.service';
import { FavoriController } from './favori.controller';

@Module({
  providers: [FavoriService],
  controllers: [FavoriController]
})
export class FavoriModule {}
