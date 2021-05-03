import { BadRequestException, Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { ConnectionRepository } from './common/common.repository';

@Injectable()
export class RepositoryPostgres extends ConnectionRepository {
  constructor(private readonly _validate: ValidatorsCommon) {
    super();
  }

  public async saveProfessional(data: Professional): Promise<any> {
    try {
      const typeProfessionalId = await this.saveTypeProfessional(
        data.tipoDeProfissional,
      );

      const querySaveProfessional = `insert into professional values (default, 
            '${data.nome}', '${data.telefone}', 
            '${data.email}', ${typeProfessionalId}, 
            ${data.situacao}, '${data.updatedAt}', '${data.createdAt}') returning *`;

      const result = await super.executeQuery(querySaveProfessional);

      if (result.length < 0 || this._validate.isNullOrUndefined(result)) {
        throw new Error('Error on the save professional');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  private async saveTypeProfessional(data: TypeProfessional): Promise<any> {
    try {
      const querySaveTypeProfessional = `insert into typeprofessional values 
        (default, '${data.descricao}', ${data.situacao}, 
        '${data.updatedAt}', '${data.createdAt}') returning id`;

      const result = await super.executeQuery(querySaveTypeProfessional);

      if (this._validate.isNullOrUndefined(result) && result.length < 1) {
        throw new BadRequestException();
      }

      return result[0].id;
    } catch (error) {
      throw error;
    }
  }

  public async findProfessional(): Promise<any[]> {
    try {
      const query = 'select * from professional';
      const result = await super.executeQuery(query);

      const list = await this.buildList(result);

      return list;
    } catch (error) {
      throw error;
    }
  }

  private async buildList(professional = []): Promise<any> {
    const list = [];
    for (let i = 0; i < professional.length; i++) {
      const typeProfessional = await this.findTypeProfessionalById(
        professional[i].tipoprofissional,
      );
      const response = professional[i];
      response.tipoprofissional = await typeProfessional;
      list.push(response);
    }

    return list;
  }

  private async findTypeProfessionalById(
    typeProfessionalId: any,
  ): Promise<any> {
    try {
      const query = `select * from typeprofessional where id = ${typeProfessionalId}`;
      const result = await super.executeQuery(query);

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async editProfessional(): Promise<any> {
    return null;
  }
}
