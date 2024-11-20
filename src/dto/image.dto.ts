import { IsNotEmpty } from 'class-validator';
export class ImageDto {
  @IsNotEmpty({
    message: 'Le profil est obligatoire',
  })
  profil : string;

  @IsNotEmpty({
    message: 'Le  carte est obligatoire',
  })
  carte : string;

  @IsNotEmpty({
    message: 'user est obligatoire',
  })
  id_user : string;
}