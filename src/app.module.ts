import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { envValidate } from './common/validation/env.validation';
import { envVariableKeys } from './common/consts/env.const';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validate: envValidate
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: configService.get<string>(envVariableKeys.dbType) as 'postgres',
                host: configService.get<string>(envVariableKeys.dbHost),
                port: configService.get<number>(envVariableKeys.dbPort),
                username: configService.get<string>(envVariableKeys.dbUsername),
                password: configService.get<string>(envVariableKeys.dbPassword),
                database: configService.get<string>(envVariableKeys.dbDatabase),
                entities: ['dist/**/*.entity.js'],
                synchronize: true,
                logging: true
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
