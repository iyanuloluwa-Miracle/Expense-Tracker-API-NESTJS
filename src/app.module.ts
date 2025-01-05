// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PaymentsModule } from './payment/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'flora.db.elephantsql.com',
      port: 5432,
      username: 'mxfmhphk',
      password: 'BsZ4J94pcOxba_EE9dotE2Va007wzPMs',
      database: 'mxfmhphk',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ExpensesModule,
    PaymentsModule,
  ],
})
export class AppModule {}
