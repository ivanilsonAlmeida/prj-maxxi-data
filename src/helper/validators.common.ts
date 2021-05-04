import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorsCommon {
  /**
   * Método genérico que valida se um objeto é null ou undefined
   * @param value objeto recebido para validar
   * @returns retorna um boolean informando se o objeto é null/undefined ou não
   */
  public isNullOrUndefined(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Método que faz a validação dos campos obrigatórios do payload
   * @param data payload enviado para validação
   * @returns retorna um boolean indicando se existe algum campo obrigatório que não esteja preenchido
   */
  public validateBody(data: any): boolean {
    if (
      this.isNullOrUndefined(data.nome) ||
      this.isNullOrUndefined(data.tipoDeProfissional) ||
      this.isNullOrUndefined(data.tipoDeProfissional.descricao) ||
      this.isNullOrUndefined(data.tipoDeProfissional.situacao) ||
      this.isNullOrUndefined(data.tipoDeProfissional.updatedat) ||
      this.isNullOrUndefined(data.tipoDeProfissional.createdat) ||
      this.isNullOrUndefined(data.situacao) ||
      this.isNullOrUndefined(data.updatedat) ||
      this.isNullOrUndefined(data.createdat)
    ) {
      console.error(new Error('Erro in any data from body'));
      return false;
    } else {
      return true;
    }
  }
}
