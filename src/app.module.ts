import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PartnersModule } from './partners/partners.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { ExcursionsModule } from './excursions/excursions.module';
import { GalleryModule } from './gallery/gallery.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContactsModule } from './contacts/contacts.module';
import { PdfModule } from './pdf/pdf.module';
import { PasswordModule } from './password/password.module';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        logging: true,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    PartnersModule,
    NewsModule,
    ExcursionsModule,
    GalleryModule,
    ReviewsModule,
    ContactsModule,
    PdfModule,
    PasswordModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
