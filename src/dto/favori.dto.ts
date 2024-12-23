import { IsNotEmpty } from 'class-validator';
export class FavoriDto {
  @IsNotEmpty({
    message: 'Le utilisateur est obligatoire',
  })
  id_user : string;

  @IsNotEmpty({
    message: 'Le champ service est obligatoire',
  })
  id_service : string;
}