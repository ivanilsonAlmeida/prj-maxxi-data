import { Injectable } from '@nestjs/common';
import { RepositoryPostgres } from 'src/repository/repository.postgres';

@Injectable()
export class ProfessionalService {
  constructor(private readonly pg: RepositoryPostgres) {}

  public saveProfessional() {
    return null;
  }

  public editProfessional() {
    return null;
  }

  public async findProfessional(): Promise<any> {
    try {
      const result = await this.pg.findProfessional();

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
