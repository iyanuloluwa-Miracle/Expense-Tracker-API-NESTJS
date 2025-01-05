// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { PaymentsController } from './payments.controller';
import { ExpensesModule } from '../expenses/expenses.module';

@Module({
  imports: [ExpensesModule],
  providers: [PaystackService],
  exports: [PaystackService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}