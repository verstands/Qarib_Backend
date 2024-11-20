import { IsNotEmpty } from 'class-validator';
export class ServicesDto {
  @IsNotEmpty({
    message: 'Le nom est obligatoire',
  })
  titre : string;

  @IsNotEmpty({
    message: 'Le description est obligatoire',
  })
  description : string;

  @IsNotEmpty({
    message: 'Le icon est obligatoire',
  })
  icon : string;
}