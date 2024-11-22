import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Op, type Attributes } from 'sequelize';
import { Entity } from '../shared/entity';
import { ValueObject } from '../shared/value-object';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
type SearchResultConstructorProps<E extends Entity> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
};

export class SearchResult<E extends Entity = Entity> extends ValueObject {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  sortableFields: string[] = ['name', 'created_at'];

  constructor(props: SearchResultConstructorProps<E>) {
    super();
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
  }

  protected async applyFilter(
    items: Character[],
    filter: CharacterFilter | null,
  ): Promise<Character[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toString().toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => Character {
    return Character;
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
    };
  }
}

export class CharacterFilter {
  name?: string;
  _class?: string;
}

export interface CharacterSearchParams {
  filter: CharacterFilter;
  page: number;
  per_page: number;
  sort: string;
  sort_dir: string;
}

export class CharacterSearchResult extends SearchResult<Character> {}

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
    const result = await this.characterModel.findOne({
      where: {
        character_id,
      },
    });
    return result;
  }
  async search(props: CharacterSearchParams): Promise<CharacterSearchResult> {
    const sortableFields: string[] = ['name', 'class'];
    const mapFilter = Object.values(props).map((item) => {
      return item;
    });
    const { count, rows: models } = await this.characterModel.findAndCountAll({
      ...(props && {
        where: {
          class: { [Op.like]: `%${mapFilter[0]}%` },
        },
      }),
      ...(props.sort && sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir || 'asc']] }
        : { order: [['created_at', 'desc']] }),
    });
    return new CharacterSearchResult({
      items: models.map(
        (model) =>
          new Character({
            character_id: model.character_id,
            name: model.name,
            class: model.class,
            race: model.race,
            level: model.level,
            stats: model.stats,
            skills: model.skills,
            equipment: model.equipment,
            background: model.background,
            image_url: model.image_url,
            is_active: model.is_active,
            created_at: model.created_at,
            created_by: model.created_by,
          }),
      ),
      total: count,
      current_page: props.page,
      per_page: props.per_page,
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
