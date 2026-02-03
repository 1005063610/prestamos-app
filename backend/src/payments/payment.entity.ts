import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Loan } from '../loans/loan.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; // monto pagado

  @ManyToOne(() => Loan, (loan) => loan.id)
  loan: Loan;

  @CreateDateColumn()
  paymentDate: Date;
}
