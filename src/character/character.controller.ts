import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterCollectionDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterCollectionDto) {
    return this.characterService.create(createCharacterDto as any);
  }

  @Post('many')
  bulkCreate(@Body() createCharacterDto: CreateCharacterCollectionDto[]) {
    return this.characterService.bulkCreate(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
