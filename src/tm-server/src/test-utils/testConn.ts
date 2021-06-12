/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
import { Connection, createConnection } from 'typeorm';

export const testConn = (drop: boolean = false): Promise<Connection> => createConnection({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lukehowsam',
  password: '123',
  database: 'tmtodos-test',
  synchronize: drop,
  dropSchema: drop,
  entities: [__dirname + '/../entities/*.*'],
});
