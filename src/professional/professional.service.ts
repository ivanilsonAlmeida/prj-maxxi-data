import { Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
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

  /**
   * Método que faz a conexão com a camada de repositório para salvar ou editar um professional
   * @param payload payload com dados do profissional enviado pela controler
   * @param typeMethod parâmetro que define qual caminho o software vai seguir (Salvar ou Editar)
   * @returns retorna uma mensagem informando caso o profissional for salvo com sucesso!
   */
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

  /**
   * Método que faz a conexão com a camada de repositório para buscar todos os professionais
   * @returns lista de profissionais cadastrados
   */
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
