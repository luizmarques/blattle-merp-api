// import { Sequelize } from 'sequelize-typescript';
// import { Character } from '../character/entities/character.entity';
// import type { ConfigService } from '@nestjs/config';

// export const databaseProviders = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async (configService: ConfigService) => {
//       const sequelize = new Sequelize(configService.sequelizeOrmConfig);
//       sequelize.addModels([Character]);
//       await sequelize.sync();
//       return sequelize;
//     },
//     inject: [ConfigService],
//   },
// ];
