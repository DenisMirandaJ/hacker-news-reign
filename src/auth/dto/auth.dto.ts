import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  password: string;
}
