import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('daily')
  payDaily(
    @Body('loanId') loanId: number,
    @Body('amount') amount: number,
  ) {
    return this.paymentsService.payDaily(loanId, amount);
  }
}

