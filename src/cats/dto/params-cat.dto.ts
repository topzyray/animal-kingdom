import { IsDefined, IsMongoId } from 'class-validator';

export class ParamsCatDto {
  @IsMongoId()
  @IsDefined()
  id: string;
}
