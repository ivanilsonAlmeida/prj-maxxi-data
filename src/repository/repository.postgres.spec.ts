import { RepositoryPostgres } from './repository.postgres';

describe('Repository PostGres', () => {
  test('repository should return without profissional register ', async () => {
    let repositoryPostgres: RepositoryPostgres;

    const resultQuery = await repositoryPostgres.findProfessional();

    expect(resultQuery.length).toBe(0);
  });
});
