import { IsNotEmpty } from 'class-validator';
export class NotificationsDto {
  @IsNotEmpty({
    message: 'Le recever est obligatoire',
  })
  id_recever : string;

  @IsNotEmpty({
    message: 'Le champ sender est obligatoire',
  })
  id_sender : string;

  @IsNotEmpty({
    message: 'Le champ message est obligatoire',
  })
  message : string;
}