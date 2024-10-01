import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryAnimalDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;
}
