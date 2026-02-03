import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]), // 🔥 habilita el repositorio
  ],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService], // 🔥 para Reports y Payments
})
export class LoansModule {}

