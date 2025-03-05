import { IsNotEmpty } from 'class-validator';
export class ImageDto {
  @IsNotEmpty({
    message: 'Le url est obligatoire',
  })
  url : string;

  @IsNotEmpty({
    message: 'Le  status est obligatoire',
  })
  status : string;

  @IsNotEmpty({
    message: 'user est obligatoire',
  })
  id_user : string;
} 