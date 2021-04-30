import { TypeProfessional } from './type-professional.model';
export class Professional {
  id: number;
  nome: string;
  telefone: number;
  email: string;
  tipoDeProfissional: TypeProfessional;
  situacao: boolean;
  updatedAt: string;
  createdAt: string;
}
