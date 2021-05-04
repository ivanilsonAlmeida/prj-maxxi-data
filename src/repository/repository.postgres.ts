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

  /**
   * Método responsável por iniciar o salvamento ou uma edição de um profissional
   * @param data Payload enviado através da request POST/PUT
   * @param type parâmetro que define qual caminho o software vai seguir (Salvar ou Editar)
   * @returns Retorna o object de professional salvo ou alterado dependendo de qual end-point for chamado
   */
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

  /**
   * Método responsável por criar a query para salvamento de um profissional
   * @param data Payload enviado através da request POST
   * @returns retorna a query para inserir um profissional no banco
   */
  private async saveProfessional(data: Professional): Promise<any> {
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

  /**
   * Método responsável por criar a query para edição de um profissional
   * @param data Payload enviado através da request PUT
   * @returns retorna a query para atualizar um profissional no banco
   */
  private async editProfessional(data: any): Promise<any> {
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

  /**
   * Método responsável por salvar o tipo de profissional no banco
   * @param data payload com os dados do tipo de profissional
   * @returns retorna o id do tipo de profissional salvo
   */
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

  /**
   * Método responsável por editar o tipo de profissional no banco
   * @param data payload com os dados do tipo de profissional
   * @returns retorna o id do tipo de profissional salvo
   */
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

  /**
   * Método responsável por criar a query de busca de profissionais
   * @returns retorna a lista de profissionais
   */
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

  /**
   * Método responsável de montar a lista retornada de profissionais no formato da model
   * @param professional lista de funcionários recebida do banco
   * @returns retorna a lista montada de profissionais
   */
  private async buildList(professional = []): Promise<Array<Professional>> {
    const list: Array<Professional> = [];

    for (let i = 0; i < professional.length; i++) {
      const typeProfessional = await this.findTypeProfessionalById(
        professional[i].tipodeprofissional,
      );
      const response: Professional = professional[i];

      response.tipoDeProfissional = await typeProfessional[0];
      list.push(response);
    }

    return list;
  }

  /**
   * Método responsável por retornar um tipo de profissional buscando por id
   * @param typeProfessionalId id de um tipo de profissional cadastrado no banco
   * @returns retorna os dados de um tipo de profissional
   */
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
