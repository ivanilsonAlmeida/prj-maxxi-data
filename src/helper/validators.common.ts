import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorsCommon {
  public isNullOrUndefined(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  }

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
