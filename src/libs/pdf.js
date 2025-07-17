import PDFDocument from 'pdfkit'

export function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.fontSize(25).text('Hola Kevin este es un PDF', 100, 100)
    doc.moveTo(0,20)
    .lineTo(100, 160) 
    .quadraticCurveTo(130, 200, 150, 120)
    .bezierCurveTo(190,-40,200,200,300,150)
    .lineTo(400, 90)
    .stroke();
    doc.end()
}