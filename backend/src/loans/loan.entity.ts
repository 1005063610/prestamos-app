import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  totalAmount: number;

  @Column('decimal')
  installmentAmount: number;

  @Column({ default: 0 })
  paidAmount: number;

  @Column({ default: 0 })
  paidInstallments: number;

  @Column({ default: 0 })
  lateDays: number;

  @Column('decimal', { default: 0 })
  lateInterest: number;

  @Column({ default: false })
  isLate: boolean;

  @Column({ default: 'ACTIVE' })
  status: string;

  @OneToMany(() => Payment, (payment) => payment.loan)
  payments: Payment[];
}

