import { Body, Controller, Get, Header, Post, Put } from '@nestjs/common';
import { TypeSaveEdit } from 'src/helper/enum/type-save-edit.enum';
import { ProfessionalService } from './professional.service';

@Controller('')
export class ProfessionalController {
  constructor(private readonly _service: ProfessionalService) {}

  @Post('/professional')
  public createProfessional(@Body() payload) {
    try {
      return this._service.saveOrEditProfessional(payload, TypeSaveEdit.save);
    } catch (error) {
      throw error;
    }
  }

  @Put('/professional')
  public editProfessional(@Body() payload) {
    try {
      return this._service.saveOrEditProfessional(payload, TypeSaveEdit.edit);
    } catch (error) {
      throw error;
    }
  }

  @Get('/professional')
  public findProfessional() {
    try {
      return this._service.findProfessional();
    } catch (error) {
      throw error;
    }
  }
}
