import { plainToClass, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
enum Environment {
    Local = 'local',
    dev = 'dev'
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    DB_TYPE: string;
    @IsString()
    DB_HOST: string;
    @Transform(({ value }) => +value)
    @IsNumber()
    DB_PORT: number;
    @IsString()
    DB_USERNAME: string;
    @IsString()
    DB_PASSWORD: string;
    @IsString()
    DB_DATABASE: string;

    @IsString()
    ACCESS_TOKEN_SECRET: string;
    @IsString()
    REFRESH_TOKEN_SECRET: string;
}

export function envValidate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) throw new Error(errors.toString());

    return validatedConfig;
}
