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

  protected async openConnection(): Promise<any> {
    return await this.pool.connect();
  }

  protected async closeConnection(): Promise<any> {
    return await this.pool.end();
  }

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
