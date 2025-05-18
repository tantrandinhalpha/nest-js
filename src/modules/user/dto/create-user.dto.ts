import {
  IsString,
  IsInt,
  Max,
  Min,
  IsEmail,
  Length,
  IsNotEmpty,
  ValidateIf,
  Validate,
} from 'class-validator';
import { CustomEmailValidator } from 'src/common/validator/email.validator';

export class CreateUserDto {
  @Validate(CustomEmailValidator, [{ isRequired: false }])
  email: string;

  @IsInt({
    message: 'Age must be from 0 to 100',
  })
  @Min(0)
  @Max(100)
  age: number;

  @Length(10, 20, {
    message: 'First name must be between 10 and 20 characters long',
  })
  firstName: string;

  @Length(10, 20, {
    message: 'Last name must be between 10 and 20 characters long',
  })
  lastName: string;

  @IsString()
  password: string;
}
