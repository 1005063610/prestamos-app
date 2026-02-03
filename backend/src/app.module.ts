import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansModule } from './loans/loans.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { HealthController } from './health.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'prestamos_db',
      autoLoadEntities: true,
      synchronize: true, // SOLO en desarrollo

    }),
    LoansModule,
    PaymentsModule,
    ReportsModule,
    HealthController,
  ],
})
export class AppModule {}
