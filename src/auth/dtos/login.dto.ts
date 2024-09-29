import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.trim())
  @IsDefined()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
