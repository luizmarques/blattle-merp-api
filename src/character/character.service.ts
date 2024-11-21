import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Attributes } from 'sequelize';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    return await this.characterModel.create(createCharacterDto as any);
  }

  async bulkCreate(
    createCharacterDto: Attributes<Character>[],
  ): Promise<Character[]> {
    return await this.characterModel.bulkCreate(createCharacterDto);
  }

  async getById(character_id: string): Promise<Character> {
    return await this.characterModel.findByPk(character_id);
  }

  async findAll(): Promise<Character[]> {
    return await this.characterModel.findAll();
  }

  async findOne(character_id: string): Promise<Character> {
    return await this.characterModel.findOne({
      where: {
        character_id,
      },
    });
  }

  async update(
    character_id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.findOne(character_id);
    return character.update(updateCharacterDto);
  }

  async remove(character_id: string): Promise<void> {
    const character = await this.findOne(character_id);
    await character.destroy();
  }
}
