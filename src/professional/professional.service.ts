import { Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
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

  public async saveProfessional(payload: any): Promise<any> {
    try {
      const model = this._admin.buildModelProfessional(payload);

      const resultQuery = await this._repository.saveProfessional(model);

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

  public editProfessional() {
    return null;
  }

  public async findProfessional(): Promise<any> {
    let professional: Professional;
    let typeProfessional: TypeProfessional;

    try {
      const resultQuery = await this._repository.findProfessional();

      if (resultQuery.length < 1) {
        return;
      }

      // professional = this._admin.buildModelProfessional(professional);

      return resultQuery;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
