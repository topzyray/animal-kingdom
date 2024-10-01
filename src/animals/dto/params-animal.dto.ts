import { IsDefined, IsMongoId } from 'class-validator';

export class ParamsAnimalDto {
  @IsMongoId()
  @IsDefined()
  id: string;
}
