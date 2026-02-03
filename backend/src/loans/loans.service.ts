
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepo: Repository<Loan>,
  ) {}

  async createLoan(
    amount: number,
    interestRate: number,
    installments: number,
  ) {
    const totalAmount = amount + amount * (interestRate / 100);
    const installmentAmount = totalAmount / installments;

    const loan = this.loanRepo.create({
      amount,
      interestRate,
      totalAmount,
      installments,
      installmentAmount,
      frequency: 'daily',
      paidAmount: 0,
      paidInstallments: 0,
      status: 'ACTIVE',
      isLate: false,
    });

    return await this.loanRepo.save(loan);
  }

  // 🔴 Préstamos en mora
  async findLateLoans() {
    return await this.loanRepo.find({
      where: { isLate: true },
    });
  }

  // 📋 Todos los préstamos
  async findAll() {
    return await this.loanRepo.find();
  }

  // 🔍 Uno por ID
  async findOne(id: number) {
    return await this.loanRepo.findOne({
      where: { id },
      relations: ['payments'],
    });
  }
}
