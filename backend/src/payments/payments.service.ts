import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Loan } from '../loans/loan.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(Loan)
    private readonly loanRepo: Repository<Loan>,
  ) {}

  async payDaily(loanId: number, amount: number) {
    // 🔍 Buscar préstamo
    const loan = await this.loanRepo.findOne({
      where: { id: loanId },
      relations: ['payments'],
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    // 1️⃣ Registrar pago
    const payment = this.paymentRepo.create({
      amount,
      loan,
    });
    await this.paymentRepo.save(payment);

    // 2️⃣ Actualizar valores del préstamo
    loan.paidAmount += amount;
    loan.paidInstallments += 1;

    // 3️⃣ Calcular lo que debería haber pagado
    const expectedPaid =
      loan.installmentAmount * loan.paidInstallments;

    // 4️⃣ Verificar atraso + aplicar mora
    if (loan.paidAmount < expectedPaid) {
      loan.isLate = true;
      loan.status = 'LATE';
      loan.lateDays += 1;

      const dailyPenalty = loan.installmentAmount * 0.02; // 2% diario
      loan.lateInterest += dailyPenalty;
      loan.totalAmount += dailyPenalty;
    } else {
      loan.isLate = false;
      loan.status = 'ACTIVE';
    }

    // 5️⃣ Verificar si ya terminó de pagar
    if (loan.paidAmount >= loan.totalAmount) {
      loan.status = 'PAID';
      loan.isLate = false;
    }

    // 6️⃣ Guardar cambios
    await this.loanRepo.save(loan);

    // 7️⃣ Respuesta clara al frontend
    return {
      message: 'Payment registered successfully',
      payment,
      loan,
    };
  }
}

