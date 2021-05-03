import { Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
import { ValidatorsCommon } from 'src/helper/validators.common';

@Injectable()
export class ProfessionalAdministration {
  constructor(private readonly _validation: ValidatorsCommon) {}
  public buildModelProfessional(data: any): Professional {
    const response = new Professional();

    if (this._validation.isNullOrUndefined(data)) {
      throw new Error('Error on the validations');
    }

    response.nome = data.nome;
    response.telefone = data.telefone;
    response.email = data.email;
    response.tipoDeProfissional = this.buildModelTypeProfessional(
      data.tipoDeProfissional,
    );
    response.situacao = data.situacao;
    response.updatedAt = data.updatedAt;
    response.createdAt = data.createdAt;

    return response;
  }

  private buildModelTypeProfessional(data: any): TypeProfessional {
    const modelTypeProfessional = new TypeProfessional();

    if (this._validation.isNullOrUndefined(data)) {
      throw new Error('Error on the validations');
    }

    modelTypeProfessional.descricao = data.descricao;
    modelTypeProfessional.situacao = data.situacao;
    modelTypeProfessional.updatedAt = data.updatedAt;
    modelTypeProfessional.createdAt = data.createdAt;

    return modelTypeProfessional;
  }
}
