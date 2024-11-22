import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Entity } from '../../shared/entity';
import { ValueObject } from '../../shared/value-object';

export interface Stats {
  strength: number;
  agility: number;
  constitution: number;
  intelligence: number;
  intuition: number;
  presence: number;
  appearance: number;
}

export interface MeleeSkills {
  longsword: number;
  dagger: number;
}

export interface RangedSkills {
  bow: number;
}

export interface SurvivalSkills {
  tracking: number;
  herbalism: number;
  climbing: number;
}

export interface LoreSkills {
  history: number;
  geography: number;
}

export interface Languages {
  common: string;
  elvish: string;
  dwarvish: string;
}

export interface Skills {
  melee: MeleeSkills;
  ranged: RangedSkills;
  survival: SurvivalSkills;
  lore: LoreSkills;
  languages: Languages;
}

export interface Weapon {
  name: string;
  type: string;
  damage: string;
}

export interface Armor {
  type: string;
  defense: number;
}

export interface Equipment {
  weapons: Weapon[];
  armor: Armor;
  items: string[];
}

export interface Background {
  title: string;
  allies: string[];
  enemies: string[];
}

@Table({
  tableName: 'characters',
  timestamps: false,
})
export class Character extends Model implements Entity {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: true,
  })
  character_id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  race: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  class: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  level: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  stats: Stats;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  skills: Skills;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  equipment: Equipment;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  background: Background;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image_url: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  created_by: string;

  get entity_id(): ValueObject {
    class CharacterId extends ValueObject {
      constructor(id: string) {
        super();
        this.id = id;
      }
      id: string;
    }
    return new CharacterId(this.character_id);
  }

  toJSON(): any {
    return {
      character_id: this.character_id,

      name: this.name,

      class: this.class,

      race: this.race,

      level: this.level,

      stats: this.stats,

      skills: this.skills,

      equipment: this.equipment,

      background: this.background,

      image_url: this.image_url,

      is_active: this.is_active,

      created_at: this.created_at,

      created_by: this.created_by,
    };
  }
}
