import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TypeSaveEdit } from 'src/helper/enum/type-save-edit.enum';
import { ProfessionalService } from './professional.service';

@Controller('')
export class ProfessionalController {
  constructor(private readonly _service: ProfessionalService) {}

  /**
   * Request para Salvar um profissional
   * @param payload Body enviada pela request para Salvar um novo profissional
   * @returns retorna uma mensagem informando caso o profissional for salvo com sucesso!
   */
  @Post('/professional')
  public createProfessional(@Body() payload) {
    try {
      return this._service.saveOrEditProfessional(payload, TypeSaveEdit.save);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request para Editar um profissional
   * @param payload Body enviada pela request para Editar o profissional
   * @returns retorna uma mensagem informando caso o profissional for salvo com sucesso!
   */
  @Put('/professional')
  public editProfessional(@Body() payload) {
    try {
      return this._service.saveOrEditProfessional(payload, TypeSaveEdit.edit);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request que retorna a lista atual de profissionais salvos em banco.
   * @returns retorna a lista de profissionais registrados
   */
  @Get('/professional')
  public findProfessional() {
    try {
      return this._service.findProfessional();
    } catch (error) {
      throw error;
    }
  }
}
