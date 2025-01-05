// src/expenses/expenses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './entities/expense.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), UsersModule],
  providers: [ExpensesService],
  controllers: [ExpensesController],
   exports: [ExpensesService]
})
export class ExpensesModule {}