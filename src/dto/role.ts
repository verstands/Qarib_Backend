import { IsNotEmpty } from 'class-validator';
export class RoleDto {
  @IsNotEmpty({
    message: 'Le nom est obligatoire',
  })
  nom : string;  
}