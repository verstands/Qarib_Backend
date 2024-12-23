import { IsOptional, IsNotEmpty } from 'class-validator';
export class OtpAgentDto {
  @IsNotEmpty({
    message: 'Le  champs noms a est obligatoire',
  })
  noms: string;

  @IsNotEmpty({
    message: 'Le champ email est obligatoire',
  })
  email: string;
}
