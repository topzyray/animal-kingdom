import { IsOptional, IsString } from 'class-validator';

export class SearchAnimalDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  family: string;

  @IsString()
  @IsOptional()
  color: string;
}
