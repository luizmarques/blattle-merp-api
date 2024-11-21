import {
  IsString,
  IsNumber,
  IsBoolean,
  IsObject,
  IsOptional,
  IsArray,
} from 'class-validator';
import {
  Languages,
  LoreSkills,
  MeleeSkills,
  RangedSkills,
  SurvivalSkills,
} from '../entities/character.entity';

export class CreateCharacterDto {
  @IsString()
  character_id?: string;

  @IsString()
  name: string;

  @IsString()
  race: string;

  @IsString()
  class: string;

  @IsNumber()
  level: number;

  @IsObject()
  stats: {
    strength: number;
    agility: number;
    constitution: number;
    intelligence: number;
    intuition: number;
    presence: number;
    appearance: number;
  };

  @IsObject()
  skills: {
    melee: MeleeSkills;
    ranged: RangedSkills;
    survival: SurvivalSkills;
    lore: LoreSkills;
    languages: Languages;
  };

  @IsObject()
  equipment: {
    weapons: {
      name: string;
      type: string;
      damage: string;
    }[];
    armor: {
      type: string;
      defense: number;
    };
    items: string[];
  };

  @IsObject()
  background: {
    title: string;
    allies: string[];
    enemies: string[];
  };

  @IsString()
  image_url: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class CreateCharacterCollectionDto {
  @IsArray()
  characters: CreateCharacterDto[];

  @IsArray()
  featured: CreateCharacterDto[];

  @IsArray()
  enimies: CreateCharacterDto[];

  @IsArray()
  players_characters: CreateCharacterDto[];
}
