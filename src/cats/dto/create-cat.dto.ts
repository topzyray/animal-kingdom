import {
  IsDefined,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  breed: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsString()
  @IsOptional()
  owner: string;
}
