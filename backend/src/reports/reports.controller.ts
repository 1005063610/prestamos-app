import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReportsService } from './reports.service';
import { LoansService } from '../loans/loans.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly loansService: LoansService,
  ) {}

  @Get('loans/excel')
  async downloadLoans(@Res({ passthrough: true }) res: Response) {
    const loans = await this.loansService.findAll();
    const workbook = await this.reportsService.exportLoans(loans);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=prestamos.xlsx',
    );

    await workbook.xlsx.write(res);
  }
}
