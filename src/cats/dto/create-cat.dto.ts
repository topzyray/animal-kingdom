import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  age: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  breed: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsInt()
  @IsOptional()
  weight: number;

  @IsString()
  @IsOptional()
  gender: string;

  @IsBoolean()
  @IsOptional()
  adopted: boolean;

  @IsDateString()
  @IsOptional()
  adoptedDate: Date;

  // @IsArray()
  // vaccinations: [{ conditions: string; treatment: string; date: Date }];

  // medicalHistory: [{ condition: string; treatment: string; date: Date }];

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsString()
  @IsOptional()
  owner: string;
}
