import { IsNotEmpty } from 'class-validator';
export class NotificationsDto {
  @IsNotEmpty({
    message: 'Le recever est obligatoire',
  })
  recev_notification : string;

  @IsNotEmpty({
    message: 'Le champ sender est obligatoire',
  })
  send_notification : string;

  @IsNotEmpty({
    message: 'Le champ message est obligatoire',
  })
  message : string;

  @IsNotEmpty({
    message: 'Le champ message est obligatoire',
  })
  status : string;

  @IsNotEmpty({
    message: 'Le champ message est obligatoire',
  })
  titre : string;
}