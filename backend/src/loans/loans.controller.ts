import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // 📌 Crear préstamo
  @Post()
  create(
    @Body('amount') amount: number,
    @Body('interestRate') interestRate: number,
    @Body('installments') installments: number,
  ) {
    return this.loansService.createLoan(
      amount,
      interestRate,
      installments,
    );
  }

  // 🔴 Préstamos en mora
  @Get('late')
  getLate() {
    return this.loansService.findLateLoans();
  }

  // 📋 Todos los préstamos
  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  // 🔍 Préstamo por ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.loansService.findOne(Number(id));
  }
}

