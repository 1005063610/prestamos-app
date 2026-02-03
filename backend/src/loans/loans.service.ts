import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findAll() {
    return this.loanRepository.find({
      relations: ['payments'],
    });
  }

  async findOne(id: number) {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['payments'],
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  async save(loan: Loan) {
    return this.loanRepository.save(loan);
  }
}

