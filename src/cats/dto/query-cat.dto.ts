import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryCatDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;
}
