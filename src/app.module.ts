import { ConfigModule } from '@modules/@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
