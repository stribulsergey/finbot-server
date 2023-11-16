import dotenv from 'dotenv';

export const APP_ENV = process.env.APP_ENV || 'development';
console.info(`[CONFIG]\tUsing environments from ./.env.${APP_ENV}`);
dotenv.config({ path: `.env.${APP_ENV}` });

export const TG_TOKEN: string = process.env.TG_TOKEN || '';
export const PORT: number = process.env.PORT ? +process.env.PORT : 4000;
export const LOG_LEVEL: string = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
export const SESSION_SECRET: string = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : '';

export const TYPEORM_HOST: string = process.env.TYPEORM_HOST || '';
export const TYPEORM_USERNAME: string = process.env.TYPEORM_USERNAME || '';
export const TYPEORM_PASSWORD: string = process.env.TYPEORM_PASSWORD || '';
export const TYPEORM_DATABASE: string = process.env.TYPEORM_DATABASE || '';
export const TYPEORM_PORT: number = process.env.TYPEORM_PORT ? +process.env.TYPEORM_PORT : 5432;
export const TYPEORM_MIGRATIONS: string = process.env.TYPEORM_MIGRATIONS || '';
export const TYPEORM_LOGGING: boolean = process.env.TYPEORM_LOGGING === 'true';
