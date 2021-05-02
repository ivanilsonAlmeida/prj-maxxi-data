import { Controller, Get, Post, Put } from '@nestjs/common';
import { ProfessionalService } from './professional.service';

@Controller('')
export class ProfessionalController {
  constructor(private readonly _service: ProfessionalService) {}

  @Post('/professional')
  public createProfessional() {
    return null;
  }

  @Put('/professional')
  public editProfessional() {
    return null;
  }

  @Get('/professional')
  public findProfessional() {
    return this._service.findProfessional();
  }
}
