import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLocaleLowerCase())
  @IsDefined()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
