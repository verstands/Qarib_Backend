import { IsNotEmpty } from 'class-validator';
export class ProblemeDto {
  @IsNotEmpty({
    message: 'Le nom utilisateur obligatoire',
  })
  id_user : string;

  @IsNotEmpty({
    message: 'Le nom message obligatoire',
  })
  message : string;
}