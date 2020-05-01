import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [
		RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
		TypeOrmModule.forRoot({
			"type": "postgres",
			"host": process.env.DB_HOST,
			"port": Number(process.env.DB_PORT),
			"username": process.env.DB_USERNAME,
			"password": process.env.DB_PASSWORD,
			"database": process.env.DB_DATABASE,
			"extra": {
				"ssl": {
					"rejectUnauthorized": false
				}
			},
			"entities": [User],
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
