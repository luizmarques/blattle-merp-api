import { CreateCharacterDto } from './create-character.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  updated_at?: Date;
  updated_by?: string;
}
