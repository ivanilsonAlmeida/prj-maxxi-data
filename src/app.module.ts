import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatorsCommon } from './helper/validators.common';
import { ProfessionalModule } from './professional/professional.module';
import { RepositoryPostgres } from './repository/repository.postgres';

@Module({
  imports: [ProfessionalModule],
  controllers: [AppController],
  providers: [AppService, RepositoryPostgres, ValidatorsCommon],
  exports: [RepositoryPostgres, ValidatorsCommon],
})
export class AppModule {}
