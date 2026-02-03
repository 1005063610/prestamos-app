import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Loan } from '../loans/loan.entity';

@Injectable()
export class ReportsService {
  async exportLoans(loans: Loan[]): Promise<ExcelJS.Workbook> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Prestamos');

    worksheet.addRow([
      'ID',
      'Monto',
      'Total',
      'Pagado',
      'Mora',
      'Estado',
    ]);

    loans.forEach((l) => {
      worksheet.addRow([
        l.id,
        l.amount,
        l.totalAmount,
        l.paidAmount,
        l.lateInterest,
        l.status,
      ]);
    });

    return workbook;
  }
}
