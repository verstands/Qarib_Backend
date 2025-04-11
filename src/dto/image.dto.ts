import { IsString } from 'class-validator';
export class ImageDto {

  url?: string;
  
  @IsString({ each: true, message: 'Chaque service doit être une chaîne de caractères' })
  services: string[];;

  @IsString({
    message: 'Le  status est obligatoire',
  })
  status: string;

  @IsString({
    message: 'message est obligatoire',
  })
  message: string;

  @IsString({
    message: 'Le champ noms est obligatoire',
  })
  noms: string;

  @IsString({
    message: 'Le champ telephone est obligatoire',
  })
  telephone: string;

  @IsString({
    message: 'Le champ mot de passe est obligatoire',
  })
  password: string;

  @IsString({
    message: 'Le champ role est obligatoire',
  })
  id_role: string;

  @IsString({
    message: 'Le champ ville est obligatoire',
  })
  id_ville: string;


  @IsString({
    message: 'Le champ ville est obligatoire',
  })
  email: string;
} 