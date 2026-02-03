import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]), // 🔥 ESTO ES LO QUE FALTABA
  ],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [TypeOrmModule], // opcional pero recomendado
})
export class LoansModule {}

