import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidatorsCommon } from 'src/helper/validators.common';
import { ConnectionRepository } from './common/common.repository';

@Injectable()
export class RepositoryPostgres extends ConnectionRepository {
  constructor(private readonly _validate: ValidatorsCommon) {
    super();
  }

  public async saveProfessional(): Promise<any> {
    return null;
  }

  public async findProfessional(): Promise<any> {
    const query = await super.executeQuery('select * from teste');

    if (!this._validate.isNullOrUndefined(query)) {
      throw new BadRequestException();
    }

    return query;
  }

  public async editProfessional(): Promise<any> {
    return null;
  }
}
