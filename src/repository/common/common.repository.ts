import { Pool } from 'pg';

export abstract class ConnectionRepository {
  public pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORDS,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });
  }

  /**
   * Método responsável por executar todas as querys enviadas
   * @param query query recebida para execução no banco
   * @returns retorna o valor que a query está procurando, salvando ou editando.
   */
  public async executeQuery(query: string): Promise<any> {
    try {
      await this.pool.connect();
      const res = await this.pool.query(query);

      if (!res) throw new Error();

      return res.rows;
    } catch (error) {
      console.error(error);
    }
  }
}
