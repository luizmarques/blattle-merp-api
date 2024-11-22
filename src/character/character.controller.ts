import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CharacterService, CharacterSearchParams } from './character.service';
import {
  CreateCharacterCollectionDto,
  CreateCharacterDto,
} from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() data: CreateCharacterDto) {
    return this.characterService.create(data);
  }

  @Post('many')
  async bulkCreate(@Body() createCharacterDto: CreateCharacterCollectionDto[]) {
    return this.characterService.bulkCreate(createCharacterDto);
  }

  @Get()
  search(@Query() params: CharacterSearchParams) {
    return this.characterService.search(params);
  }

  @Get('all')
  async findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
