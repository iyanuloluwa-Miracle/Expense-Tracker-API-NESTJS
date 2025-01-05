// src/payments/payments.controller.ts
import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PaystackService } from './paystack.service';
import { ExpensesService } from '../expenses/expenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { InitializePaymentDto } from './dto/initialize-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paystackService: PaystackService,
    private readonly expensesService: ExpensesService,
  ) {}

  @Post('initialize')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Payment initialized successfully' })
  async initializePayment(
    @Body() initializePaymentDto: InitializePaymentDto,
    @GetUser() user: User,
  ) {
    return this.paystackService.initializePayment(
      initializePaymentDto.amount,
      user.email,
    );
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body() payload: any,
  ) {
    // Verify webhook signature
    const isValid = this.paystackService.verifyWebhookSignature(
      signature,
      JSON.stringify(payload),
    );

    if (!isValid) {
      throw new HttpException('Invalid signature', HttpStatus.BAD_REQUEST);
    }

    if (payload.event === 'charge.success') {
      await this.expensesService.updatePaymentStatus(
        payload.data.reference,
        'COMPLETED',
      );
    }

    return { received: true };
  }
}