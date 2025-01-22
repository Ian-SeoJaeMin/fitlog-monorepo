import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        // for class-validator
        new ValidationPipe({
            whitelist: true, // 데코레이터가 없는 속성은 제거
            forbidNonWhitelisted: true, // dto에 데코레이터와 함께 정의되지 않은 속성이 오면 오류 발생
            // transform: true
            transformOptions: {
                enableImplicitConversion: true // dto의 타입에 맞게 자동으로 타입 변경
            }
        })
    );

    await app.listen(process.env.PORT ?? 10001);
    console.log(`fitlog-monorepo server is running on port ${process.env.PORT}`);
}
bootstrap();
