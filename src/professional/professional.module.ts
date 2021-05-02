import { Module } from '@nestjs/common';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { RepositoryPostgres } from 'src/repository/repository.postgres';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
  providers: [ProfessionalService, RepositoryPostgres, ValidatorsCommon],
  controllers: [ProfessionalController],
})
export class ProfessionalModule {}
