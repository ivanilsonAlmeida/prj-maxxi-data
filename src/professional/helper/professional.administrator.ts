import { Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
import { ValidatorsCommon } from 'src/helper/validators.common';

@Injectable()
export class ProfessionalAdministration {
  constructor(private readonly _validation: ValidatorsCommon) {}
  public buildModelProfessional(data: any): Professional {
    const modelProfessional = new Professional();

    if (this._validation.isNullOrUndefined(data)) {
      throw new Error('Error on the validations');
    }

    if(!this._validation.isNullOrUndefined(data)) {
      modelProfessional.id = data.id;
    }

    modelProfessional.nome = data.nome;
    modelProfessional.telefone = data.telefone;
    modelProfessional.email = data.email;
    modelProfessional.tipoDeProfissional = this.buildModelTypeProfessional(
      data.tipoDeProfissional,
    );
    modelProfessional.situacao = data.situacao;
    modelProfessional.updatedAt = data.updatedAt;
    modelProfessional.createdAt = data.createdAt;

    return modelProfessional;
  }

  private buildModelTypeProfessional(data: any): TypeProfessional {
    const modelTypeProfessional = new TypeProfessional();

    if (this._validation.isNullOrUndefined(data)) {
      throw new Error('Error on the validations');
    }

    if(!this._validation.isNullOrUndefined(data)) {
      modelTypeProfessional.id = data.id;
    }

    modelTypeProfessional.descricao = data.descricao;
    modelTypeProfessional.situacao = data.situacao;
    modelTypeProfessional.updatedAt = data.updatedAt;
    modelTypeProfessional.createdAt = data.createdAt;

    return modelTypeProfessional;
  }
}
