import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProfessionalService } from './professional.service';

@Controller('')
export class ProfessionalController {
  constructor(private readonly _service: ProfessionalService) {}

  @Post('/professional')
  public createProfessional(@Body() payload) {
    try {
      return this._service.saveProfessional(payload);
    } catch (error) {
      throw error;
    }
  }

  @Put('/professional')
  public editProfessional() {
    return null;
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
