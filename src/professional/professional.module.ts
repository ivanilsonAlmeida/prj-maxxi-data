import { Module } from '@nestjs/common';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { RepositoryPostgres } from 'src/repository/repository.postgres';
import { ProfessionalAdministration } from './helper/professional.administrator';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
  providers: [
    ProfessionalService,
    RepositoryPostgres,
    ValidatorsCommon,
    ProfessionalAdministration,
  ],
  controllers: [ProfessionalController],
})
export class ProfessionalModule {}
