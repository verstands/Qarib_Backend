import { IsNotEmpty } from 'class-validator';
export class EvaluationDto {
  @IsNotEmpty({
    message: 'Le  nombre est obligatoire',
  })
  nombrer : string;

  @IsNotEmpty({
    message: 'user est obligatoire',
  })
  id_user : string;
}