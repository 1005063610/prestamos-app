import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  // 💰 Monto inicial
  @Column()
  amount: number;

  // 📈 Interés inicial (%)
  @Column()
  interestRate: number;

  // 💵 Total a pagar (incluye intereses y mora)
  @Column()
  totalAmount: number;

  // 🔢 Número de cuotas
  @Column()
  installments: number;

  // 💳 Valor de cada cuota
  @Column()
  installmentAmount: number;

  // ⏱ daily | weekly | monthly
  @Column()
  frequency: string;

  // 📆 Fecha de creación
  @CreateDateColumn()
  createdAt: Date;

  // 💸 Pagos relacionados
  @OneToMany(() => Payment, (payment) => payment.loan)
  payments: Payment[];

  // ✅ Cuotas pagadas
  @Column({ default: 0 })
  paidInstallments: number;

  // ✅ Total pagado
  @Column({ default: 0 })
  paidAmount: number;

  // 🔴 Está en mora
  @Column({ default: false })
  isLate: boolean;

  // 📌 ACTIVE | LATE | PAID
  @Column({ default: 'ACTIVE' })
  status: string;

  // ⛔ Días en mora
  @Column({ default: 0 })
  lateDays: number;

  // 💥 Interés por mora acumulado
  @Column({ default: 0 })
  lateInterest: number;
}
