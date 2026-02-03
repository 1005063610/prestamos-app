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

  @Column()
  amount: number;

  @Column()
  interestRate: number;

  @Column()
  totalAmount: number;

  @Column()
  installments: number;

  @Column()
  installmentAmount: number;

  @Column()
  frequency: string;

  @OneToMany(() => Payment, (payment) => payment.loan)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  paidInstallments: number;

  @Column({ default: 0 })
  paidAmount: number;

  @Column({ default: false })
  isLate: boolean;

  @Column({ default: 'ACTIVE' })
  status: string;

  // ✅ CAMPOS QUE FALTABAN
  @Column({ default: 0 })
  lateDays: number;

  @Column({ type: 'float', default: 0 })
  lateInterest: number;
}
