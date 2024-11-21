import { Sequelize } from 'sequelize-typescript';
import { Character } from '../character/entities/character.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        password: 'root',
        username: 'root',
        database: 'mysql',
        host: 'localhost',
        port: 3306,
      });
      sequelize.addModels([Character]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
