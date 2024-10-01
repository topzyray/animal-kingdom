import { IsDefined, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  family: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  photoUrl: string;
}
