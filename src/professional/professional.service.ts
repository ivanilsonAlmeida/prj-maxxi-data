import { Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
import { TypeSaveEdit } from 'src/helper/enum/type-save-edit.enum';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { RepositoryPostgres } from 'src/repository/repository.postgres';
import { ProfessionalAdministration } from './helper/professional.administrator';

@Injectable()
export class ProfessionalService {
  constructor(
    private readonly _repository: RepositoryPostgres,
    private readonly _admin: ProfessionalAdministration,
    private readonly _validate: ValidatorsCommon,
  ) {}

  public async saveOrEditProfessional(
    payload: any,
    typeMethod: TypeSaveEdit,
  ): Promise<any> {
    try {
      if (!this._validate.validateBody(payload)) {
        return;
      }

      const model = this._admin.buildModelProfessional(payload);

      const resultQuery = await this._repository.saveOrEditProfessional(
        model,
        typeMethod,
      );

      if (this._validate.isNullOrUndefined(resultQuery[0])) {
        throw new Error('Any error on the save professional!');
      }

      return {
        message: `Profissional salvo com Sucesso!`,
      };
    } catch (error) {
      throw error;
    }
  }

  public async findProfessional(): Promise<Array<Professional>> {
    try {
      const listProfessional = await this._repository.findProfessional();

      if (listProfessional.length < 1) {
        return;
      }

      return listProfessional;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
