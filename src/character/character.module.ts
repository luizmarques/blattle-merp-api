import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';

@Module({
  imports: [SequelizeModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
