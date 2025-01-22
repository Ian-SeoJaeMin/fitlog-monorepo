import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envVariableKeys } from '../consts/env.const';

export const databaseProvider = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
            ({
                type: configService.get<string>(envVariableKeys.dbType),
                host: configService.get<string>(envVariableKeys.dbHost),
                port: configService.get<number>(envVariableKeys.dbPort),
                username: configService.get<string>(envVariableKeys.dbUsername),
                password: configService.get<string>(envVariableKeys.dbPassword),
                database: configService.get<string>(envVariableKeys.dbDatabase),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true
            }) as TypeOrmModuleOptions
    })
];
