import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: +configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: [Note],
      synchronize: true,
    }),
    inject: [ConfigService]
  }), ConfigModule, ConfigModule.forRoot({ envFilePath: ['.env'] }), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
