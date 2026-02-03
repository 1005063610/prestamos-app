
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Loan } from '../loans/loan.entity';

@Injectable()
export class ReportsService {
  async exportLoans(loans: Loan[]) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Préstamos');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Total', key: 'totalAmount', width: 15 },
      { header: 'Cuota', key: 'installmentAmount', width: 15 },
      { header: 'Pagado', key: 'paidAmount', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
    ];

    loans.forEach((loan) => {
      sheet.addRow({
        id: loan.id,
        totalAmount: loan.totalAmount,
        installmentAmount: loan.installmentAmount,
        paidAmount: loan.paidAmount,
        status: loan.status,
      });
    });

    return workbook;
  }
}
