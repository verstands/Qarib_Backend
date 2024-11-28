import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class AgentInterface {
  id?: string;
  @IsNotEmpty({
    message: 'Le champ noms est obligatoire',
  })
  noms: string;

  @IsNotEmpty({
    message: 'Le champ statut est obligatoire',
  })
  statut: string

  @IsNotEmpty({
    message: 'Le champ telephone est obligatoire',
  })
  telephone: string;

  @IsNotEmpty({
    message: 'Le champ mot de passe est obligatoire',
  })
  @MinLength(5, {
    message: 'Votre mot de passe doit faire plus de 5 caracteres. ',
  })
  password: string;

  @IsNotEmpty({
    message: 'Le champ role est obligatoire',
  })
  id_role: string;

  @IsNotEmpty({
    message: 'Le champ role est obligatoire',
  })
  latitude: number;

  @IsNotEmpty({
    message: 'Le champ role est obligatoire',
  })
  longitude: number;

  @IsNotEmpty({
    message: 'Le champ ville est obligatoire',
  })
  id_ville: string;

  @IsEmail(
    {},
    {
      message: 'Vous devez fournir une adresse email valide',
    },
  )
  email: string;
}