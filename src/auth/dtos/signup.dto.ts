import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLocaleLowerCase())
  @IsDefined()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must countain 1 uppercase, 1 lowercase, any of '@$!%*?&' and 8 characters",
    },
  )
  password: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[A-Za-zÀ-ÿẸỌṢẹọṣ-]+$/, {
    message: 'Enter valid characters',
  })
  firstName: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[A-Za-zÀ-ÿẸỌṢẹọṣ-]+$/, {
    message: 'Enter valid characters',
  })
  lastName: string;
}
