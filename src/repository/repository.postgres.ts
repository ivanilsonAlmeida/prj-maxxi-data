import { BadRequestException, Injectable } from '@nestjs/common';
import { Professional } from 'src/domain/model/professional.model';
import { TypeProfessional } from 'src/domain/model/type-professional.model';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { ConnectionRepository } from './common/common.repository';
import { format } from 'date-fns';
import { TypeSaveEdit } from 'src/helper/enum/type-save-edit.enum';

@Injectable()
export class RepositoryPostgres extends ConnectionRepository {
  constructor(private readonly _validate: ValidatorsCommon) {
    super();
  }

  public async saveOrEditProfessional(data: Professional, type: TypeSaveEdit) {
    try {
      let query;
      if (type === TypeSaveEdit.save) {
        query = await this.saveProfessional(data);
      } else if (type === TypeSaveEdit.edit) {
        query = await this.editProfessional(data);
      }

      const result = await super.executeQuery(query);

      if (result.length < 0 || this._validate.isNullOrUndefined(result)) {
        throw new Error('Error on the save professional');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async saveProfessional(data: Professional): Promise<any> {
    try {
      const getDateFromCreationProfessional = format(
        new Date(),
        'dd/MM/yyyy HH:mm:ss',
      );
      const typeProfessionalId = await this.saveTypeProfessional(
        data.tipoDeProfissional,
      );

      const querySaveProfessional = `insert into professional values (default, 
            '${data.nome}', '${data.telefone}', 
            '${data.email}', ${typeProfessionalId}, 
            ${data.situacao}, '${getDateFromCreationProfessional}', '${getDateFromCreationProfessional}') returning *`;

      return querySaveProfessional;
    } catch (error) {
      throw error;
    }
  }

  public async editProfessional(data: any): Promise<any> {
    try {
      const getDateFromUpdateProfessional = format(
        new Date(),
        'dd/MM/yyyy HH:mm:ss',
      );

      const typeProfessionalId = await this.editTypeProfessional(
        data.tipoDeProfissional,
      );

      const queryEditProfessional = `update professional set
      nome = '${data.nome}', telefone = '${data.telefone}', 
      email = '${data.email}', tipodeprofissional = ${typeProfessionalId},
      situacao = ${data.situacao}, updatedAt = '${getDateFromUpdateProfessional}' where id = ${data.id} returning *`;

      return queryEditProfessional;
    } catch (error) {
      throw error;
    }
  }

  private async saveTypeProfessional(data: TypeProfessional): Promise<any> {
    try {
      const getDateFromCreationTypeProfessional = format(
        new Date(),
        'dd/MM/yyyy HH:mm:ss',
      );

      const querySaveTypeProfessional = `insert into typeprofessional values 
        (default, '${data.descricao}', ${data.situacao}, 
        '${getDateFromCreationTypeProfessional}', '${getDateFromCreationTypeProfessional}') returning id`;

      const result = await super.executeQuery(querySaveTypeProfessional);

      if (this._validate.isNullOrUndefined(result) || result.length < 1) {
        throw new BadRequestException();
      }

      return result[0].id;
    } catch (error) {
      throw error;
    }
  }

  private async editTypeProfessional(data: TypeProfessional): Promise<any> {
    try {
      const getDateFromCreationTypeProfessional = format(
        new Date(),
        'dd/MM/yyyy HH:mm:ss',
      );

      const queryEditTypeProfessional = `update typeprofessional set 
        descricao = '${data.descricao}', situacao = ${data.situacao}, 
        updatedat = '${getDateFromCreationTypeProfessional}' where id = ${data.id} returning id`;

      const result = await super.executeQuery(queryEditTypeProfessional);

      if (this._validate.isNullOrUndefined(result) && result.length < 1) {
        throw new BadRequestException();
      }

      return result[0].id;
    } catch (error) {
      throw error;
    }
  }

  public async findProfessional(): Promise<Array<Professional>> {
    try {
      const query = 'select * from professional';
      const result = await super.executeQuery(query);

      const list = await this.buildList(result);

      return list;
    } catch (error) {
      throw error;
    }
  }

  private async buildList(professional = []): Promise<Array<Professional>> {
    const list: Array<Professional> = [];

    for (let i = 0; i < professional.length; i++) {
      const typeProfessional = await this.findTypeProfessionalById(
        professional[i].tipodeprofissional,
      );
      const response: Professional = professional[i];
      response.tipoDeProfissional = await typeProfessional;
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
}
