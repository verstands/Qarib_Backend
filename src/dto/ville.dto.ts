import { IsNotEmpty } from 'class-validator';
export class VilleDto {
  @IsNotEmpty({
    message: 'Le nom est obligatoire',
  })
  nom : string;
}