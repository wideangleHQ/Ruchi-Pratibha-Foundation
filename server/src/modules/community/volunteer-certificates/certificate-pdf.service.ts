import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

export interface CertificateData {
  certificateNumber: string;
  volunteerName: string;
  eventName: string;
  editionName: string;
  editionYear: number;
  issueDate: Date;
  certificateType: string;
  verificationToken: string;
}

@Injectable()
export class CertificatePdfService {
  async generate(data: CertificateData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 60, right: 60 },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const pageWidth = doc.page.width;
      const centerX = pageWidth / 2;

      // Border
      doc.rect(30, 30, pageWidth - 60, doc.page.height - 60)
        .lineWidth(2)
        .stroke('#1a5276');

      doc.rect(35, 35, pageWidth - 70, doc.page.height - 70)
        .lineWidth(0.5)
        .stroke('#2980b9');

      // Watermark
      doc.save();
      doc.opacity(0.04);
      doc.fontSize(120)
        .font('Helvetica-Bold')
        .text('RPF', 0, 200, { align: 'center', width: pageWidth });
      doc.restore();

      // Header
      doc.fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#1a5276')
        .text('RUCHI PRATIVA FOUNDATION', 0, 60, { align: 'center', width: pageWidth });

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#555555')
        .text('Empowering Communities Through Service', 0, 80, { align: 'center', width: pageWidth });

      doc.moveTo(centerX - 150, 100).lineTo(centerX + 150, 100).lineWidth(1).stroke('#2980b9');

      // Title
      const typeLabel = data.certificateType === 'EXCELLENCE' ? 'Certificate of Excellence'
        : data.certificateType === 'APPRECIATION' ? 'Certificate of Appreciation'
        : data.certificateType === 'SPECIAL' ? 'Special Recognition Certificate'
        : 'Certificate of Participation';

      doc.fontSize(28)
        .font('Helvetica-Bold')
        .fillColor('#1a5276')
        .text(typeLabel, 0, 120, { align: 'center', width: pageWidth });

      // Body
      doc.fontSize(13)
        .font('Helvetica')
        .fillColor('#333333')
        .text('This is to certify that', 0, 175, { align: 'center', width: pageWidth });

      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#1a5276')
        .text(data.volunteerName, 0, 200, { align: 'center', width: pageWidth });

      doc.moveTo(centerX - 120, 232).lineTo(centerX + 120, 232).lineWidth(0.5).stroke('#aaa');

      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#333333')
        .text('has successfully volunteered for', 0, 245, { align: 'center', width: pageWidth });

      doc.fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#2c3e50')
        .text(`${data.eventName} — ${data.editionName} (${data.editionYear})`, 0, 268, { align: 'center', width: pageWidth });

      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#333333')
        .text('and has demonstrated commendable dedication and service.', 0, 298, { align: 'center', width: pageWidth });

      // Signature area
      const sigY = 360;
      doc.moveTo(centerX - 200, sigY).lineTo(centerX - 60, sigY).lineWidth(0.5).stroke('#aaa');
      doc.moveTo(centerX + 60, sigY).lineTo(centerX + 200, sigY).lineWidth(0.5).stroke('#aaa');

      doc.fontSize(9)
        .font('Helvetica')
        .fillColor('#555555')
        .text('Date', centerX - 200, sigY + 5, { width: 140, align: 'center' })
        .text('Authorized Signatory', centerX + 60, sigY + 5, { width: 140, align: 'center' });

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#333333')
        .text(data.issueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
          centerX - 200, sigY - 15, { width: 140, align: 'center' });

      // Footer
      const footerY = doc.page.height - 80;
      doc.fontSize(8)
        .font('Helvetica')
        .fillColor('#888888')
        .text(`Certificate No: ${data.certificateNumber}`, 60, footerY, { width: pageWidth - 120, align: 'left' })
        .text(`Verification: ${data.verificationToken}`, 60, footerY + 12, { width: pageWidth - 120, align: 'left' })
        .text('Verify at: ruchiprativa.org/verify', 60, footerY + 24, { width: pageWidth - 120, align: 'left' })
        .text('This is a digitally generated certificate. No physical signature required.',
          60, footerY, { width: pageWidth - 120, align: 'right' });

      doc.end();
    });
  }
}
