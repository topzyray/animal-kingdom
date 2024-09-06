import { IsOptional, IsString } from 'class-validator';

export class SearchCatDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  breed: string;

  @IsString()
  @IsOptional()
  color: string;
}
